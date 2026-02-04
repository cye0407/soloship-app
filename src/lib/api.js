// Anthropic API service

import { buildSystemPrompt } from './prompts';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// Tools for Claude to use
const TOOLS = [
  {
    name: 'extract_north_star',
    description: 'Extract and update the North Star (problem, solution, audience) from the conversation. Use this when the user provides a clear, specific statement for any of these fields.',
    input_schema: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          enum: ['problem', 'solution', 'audience'],
          description: 'Which North Star field to update'
        },
        value: {
          type: 'string',
          description: 'The extracted value - should be a clear, specific one-sentence statement'
        }
      },
      required: ['field', 'value']
    }
  },
  {
    name: 'web_search',
    description: 'Search the web for any information relevant to the founder\'s journey. Use this proactively whenever real-world data would help — competitors, market size, pricing benchmarks, tools, communities, best practices, legal requirements, analytics platforms, growth tactics, industry trends, etc. Don\'t wait to be asked — if a search would make your advice more concrete and grounded, do it.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'add_decision',
    description: 'Log a decision that was made. Use this when the user commits to a clear decision.',
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Short title for the decision'
        },
        reasoning: {
          type: 'string',
          description: 'Why this decision was made'
        }
      },
      required: ['title', 'reasoning']
    }
  },
  {
    name: 'save_research_findings',
    description: 'Save research findings to the project. Use after completing research.',
    input_schema: {
      type: 'object',
      properties: {
        competitors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' },
              pricing: { type: 'string' },
              strengths: { type: 'string' },
              weaknesses: { type: 'string' }
            }
          },
          description: 'List of competitors found'
        },
        marketSize: {
          type: 'string',
          description: 'Market size estimate if found'
        },
        gaps: {
          type: 'array',
          items: { type: 'string' },
          description: 'Market gaps or opportunities identified'
        },
        summary: {
          type: 'string',
          description: 'Overall research summary'
        }
      },
      required: ['summary']
    }
  }
];

export async function sendMessage(apiKey, messages, project, phase, onToolUse) {
  const systemPrompt = buildSystemPrompt(phase, project);
  
  // Convert messages to Anthropic format
  const anthropicMessages = messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: anthropicMessages,
        tools: TOOLS
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    
    // Handle tool use
    let textContent = '';
    let toolResults = [];
    
    for (const block of data.content) {
      if (block.type === 'text') {
        textContent += block.text;
      } else if (block.type === 'tool_use') {
        // Execute the tool and collect result
        const result = await onToolUse(block.name, block.input);
        toolResults.push({
          toolUseId: block.id,
          toolName: block.name,
          input: block.input,
          result
        });
      }
    }

    // If there were tool uses, we need to continue the conversation
    if (toolResults.length > 0 && data.stop_reason === 'tool_use') {
      // Add assistant's response with tool use
      const assistantMessage = {
        role: 'assistant',
        content: data.content
      };
      
      // Add tool results
      const toolResultMessage = {
        role: 'user',
        content: toolResults.map(tr => ({
          type: 'tool_result',
          tool_use_id: tr.toolUseId,
          content: JSON.stringify(tr.result)
        }))
      };
      
      // Continue the conversation
      const continueResponse = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [...anthropicMessages, assistantMessage, toolResultMessage],
          tools: TOOLS
        })
      });

      if (!continueResponse.ok) {
        const error = await continueResponse.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const continueData = await continueResponse.json();
      
      // Extract text from continuation
      for (const block of continueData.content) {
        if (block.type === 'text') {
          textContent = block.text; // Replace with final response
        }
      }
    }

    return {
      content: textContent,
      toolResults
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Web search using DuckDuckGo instant answers + lite HTML search for richer results
export async function webSearch(query) {
  try {
    // Run both DuckDuckGo instant answer API and lite HTML search in parallel
    const [instantData, htmlResults] = await Promise.all([
      fetchDDGInstant(query),
      fetchDDGLite(query)
    ]);

    return {
      query,
      abstract: instantData.abstract,
      abstractSource: instantData.abstractSource,
      relatedTopics: instantData.relatedTopics,
      results: htmlResults
    };
  } catch (error) {
    console.error('Search error:', error);
    return { error: error.message, query, results: [] };
  }
}

async function fetchDDGInstant(query) {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`
    );
    if (!response.ok) return { abstract: '', abstractSource: '', relatedTopics: [] };
    const data = await response.json();
    return {
      abstract: data.Abstract || '',
      abstractSource: data.AbstractSource || '',
      relatedTopics: (data.RelatedTopics || []).slice(0, 5).map(t => ({
        text: t.Text || '',
        url: t.FirstURL || ''
      }))
    };
  } catch {
    return { abstract: '', abstractSource: '', relatedTopics: [] };
  }
}

async function fetchDDGLite(query) {
  try {
    const response = await fetch(
      `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`,
      { headers: { 'Accept': 'text/html' } }
    );
    if (!response.ok) return [];
    const html = await response.text();

    // Parse result snippets and links from the lite HTML page
    const results = [];
    const linkRegex = /<a[^>]+class="result-link"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
    const snippetRegex = /<td[^>]*class="result-snippet"[^>]*>([\s\S]*?)<\/td>/gi;

    const links = [];
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      links.push({ url: match[1], title: match[2].trim() });
    }

    const snippets = [];
    while ((match = snippetRegex.exec(html)) !== null) {
      snippets.push(match[1].replace(/<[^>]*>/g, '').trim());
    }

    for (let i = 0; i < Math.min(links.length, 8); i++) {
      results.push({
        title: links[i].title,
        url: links[i].url,
        snippet: snippets[i] || ''
      });
    }

    return results;
  } catch {
    return [];
  }
}
