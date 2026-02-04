import { useState, useRef, useEffect } from 'react';
import useStore from '../store/useStore';
import { sendMessage, webSearch } from '../lib/api';
import { getPhaseOpener } from '../lib/prompts';

export default function Chat({ project, phase }) {
  const { 
    apiKey, 
    getConversation, 
    addMessage, 
    updateNorthStar,
    addDecision,
    updatePhaseData,
    advancePhase
  } = useStore();
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const messages = getConversation(phase.id);
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on phase change
  useEffect(() => {
    inputRef.current?.focus();
  }, [phase.id]);
  
  // Add opener message if conversation is empty
  useEffect(() => {
    if (messages.length === 0) {
      const opener = getPhaseOpener(phase.id, project);
      addMessage(phase.id, 'assistant', opener);
    }
  }, [phase.id, messages.length]);

  // Handle tool use from Claude
  const handleToolUse = async (toolName, toolInput) => {
    switch (toolName) {
      case 'extract_north_star':
        updateNorthStar(toolInput.field, toolInput.value);
        return { success: true, message: `Updated ${toolInput.field}: "${toolInput.value}"` };
      
      case 'web_search':
        const searchResults = await webSearch(toolInput.query);
        return searchResults;
      
      case 'add_decision':
        addDecision(toolInput.title, toolInput.reasoning);
        return { success: true, message: `Decision logged: "${toolInput.title}"` };
      
      case 'save_research_findings':
        updatePhaseData('research', {
          competitors: toolInput.competitors || [],
          marketSize: toolInput.marketSize || '',
          gaps: toolInput.gaps || [],
          findings: toolInput.summary
        });
        return { success: true, message: 'Research findings saved' };
      
      default:
        return { error: `Unknown tool: ${toolName}` };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    // Add user message
    addMessage(phase.id, 'user', userMessage);
    
    setIsLoading(true);
    
    try {
      // Get conversation history for API
      const conversationHistory = [...messages, { role: 'user', content: userMessage }];
      
      const response = await sendMessage(
        apiKey,
        conversationHistory,
        project,
        phase.id,
        handleToolUse
      );
      
      // Add assistant response
      if (response.content) {
        addMessage(phase.id, 'assistant', response.content);
      }
    } catch (err) {
      setError(err.message);
      addMessage(phase.id, 'assistant', `Error: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="chat-main">
      {/* Phase Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <span className="chat-phase-icon">{phase.icon}</span>
          <div>
            <h1 className="chat-phase-name">{phase.name}</h1>
            <p className="chat-phase-desc">{phase.description}</p>
          </div>
        </div>
        <div className="chat-header-right">
          <div className="done-when">
            <strong>Done when:</strong> {phase.doneWhen}
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={advancePhase}
          >
            Next Phase →
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.role}`}
          >
            <div className="chat-message-content">
              <MessageContent content={msg.content} />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-message assistant">
            <div className="chat-message-content loading">
              <span className="loading-dots">Thinking</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your response... (Enter to send)"
            className="chat-input"
            rows={2}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn btn-primary chat-send"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
        {error && <div className="chat-error">{error}</div>}
      </form>
    </main>
  );
}

// Simple markdown-ish rendering
function MessageContent({ content }) {
  // Basic formatting: **bold**, headers, lists
  const formatted = content
    .split('\n')
    .map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h2 key={i} className="msg-h1">{line.slice(2)}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={i} className="msg-h2">{line.slice(3)}</h3>;
      }
      if (line.startsWith('### ')) {
        return <h4 key={i} className="msg-h3">{line.slice(4)}</h4>;
      }
      
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="msg-li">{formatInline(line.slice(2))}</li>;
      }
      
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return <li key={i} className="msg-li">{formatInline(line.replace(/^\d+\.\s/, ''))}</li>;
      }
      
      // Empty line
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Regular paragraph
      return <p key={i} className="msg-p">{formatInline(line)}</p>;
    });

  return <div className="msg-content">{formatted}</div>;
}

function formatInline(text) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
