import { PHASES } from '../../data/constants';
import useStore from '../../store/useStore';

export default function ProjectSummary() {
  const { getCurrentProject } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const p = project.profile;
  const spec = project.spec || {};
  const viability = project.viability;
  const metrics = project.metrics || {};
  
  const completedTasks = project.tasks.filter(t => t.completed).length;
  const totalTasks = project.tasks.length;
  const currentPhase = PHASES[project.phaseIndex];

  // Copy to clipboard as markdown
  const exportMarkdown = () => {
    const md = `# ${project.name}

## North Star
- **Problem:** ${p.problemOneLiner || 'TBD'}
- **Solution:** ${p.solutionOneLiner || 'TBD'}
- **Audience:** ${p.audienceOneLiner || 'TBD'}

## Current Status
- **Phase:** ${currentPhase.name}
- **Tasks:** ${completedTasks}/${totalTasks} complete
- **Evidence:** ${project.evidence.length} items
- **Decisions:** ${project.decisions.length} logged

## The Idea
${p.problem || 'Not documented yet'}

## Why Us, Why Now
- **Why You:** ${p.whyYou || 'TBD'}
- **Why Now:** ${p.whyNow || 'TBD'}
- **Differentiator:** ${p.differentiator || 'TBD'}

${viability ? `## Viability Decision
**${viability.decision.toUpperCase()}** — ${viability.reasoning || 'No reasoning provided'}
` : ''}

${spec.mvpFeatures ? `## MVP Spec
${spec.mvpFeatures}
` : ''}

${spec.pricing ? `## Pricing
${spec.pricing}
` : ''}

## Key Decisions
${project.decisions.slice(0, 5).map(d => `- **${d.title}** (${d.phase}): ${d.body?.substring(0, 100)}...`).join('\n') || 'None yet'}

---
*Last updated: ${project.updatedAt}*
`;
    navigator.clipboard.writeText(md);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      {/* Header with Export */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Project Summary</div>
          <button className="btn btn-secondary btn-sm" onClick={exportMarkdown}>
            📄 Export Markdown
          </button>
        </div>
        <p className="text-muted text-sm">
          Auto-generated overview of your project. Updates as you work.
        </p>
      </div>

      {/* Status Overview */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📊 Status</div>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Current Phase</div>
            <div className="summary-value">{currentPhase.icon} {currentPhase.name}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Tasks</div>
            <div className="summary-value">{completedTasks}/{totalTasks} complete</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Evidence</div>
            <div className="summary-value">{project.evidence.length} items</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Decisions</div>
            <div className="summary-value">{project.decisions.length} logged</div>
          </div>
        </div>
      </div>

      {/* The Idea */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💡 The Idea</div>
        </div>
        {p.problem ? (
          <div className="summary-text">{p.problem}</div>
        ) : (
          <div className="text-muted">Complete the Profile in Intake phase</div>
        )}
      </div>

      {/* Why Us, Why Now */}
      {(p.whyYou || p.whyNow || p.differentiator) && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🎯 Why Us, Why Now</div>
          </div>
          {p.whyYou && (
            <div className="mb-3">
              <div className="summary-label">Why You</div>
              <div className="summary-text">{p.whyYou}</div>
            </div>
          )}
          {p.whyNow && (
            <div className="mb-3">
              <div className="summary-label">Why Now</div>
              <div className="summary-text">{p.whyNow}</div>
            </div>
          )}
          {p.differentiator && (
            <div>
              <div className="summary-label">Differentiator</div>
              <div className="summary-text">{p.differentiator}</div>
            </div>
          )}
        </div>
      )}

      {/* Viability Decision */}
      {viability && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">⚖️ Viability Decision</div>
          </div>
          <div className={`viability-badge ${viability.decision}`}>
            {viability.decision === 'go' && '✅ GO'}
            {viability.decision === 'pivot' && '🔄 PIVOT'}
            {viability.decision === 'kill' && '❌ KILL'}
          </div>
          {viability.reasoning && (
            <div className="summary-text mt-3">{viability.reasoning}</div>
          )}
        </div>
      )}

      {/* MVP Spec */}
      {spec.mvpFeatures && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">📐 MVP Spec</div>
          </div>
          <div className="summary-text" style={{ whiteSpace: 'pre-wrap' }}>{spec.mvpFeatures}</div>
        </div>
      )}

      {/* Pricing */}
      {(spec.pricing || p.pricingHypothesis) && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">💰 Pricing</div>
          </div>
          <div className="summary-text">{spec.pricing || p.pricingHypothesis}</div>
        </div>
      )}

      {/* Recent Decisions */}
      {project.decisions.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">📝 Key Decisions</div>
          </div>
          {project.decisions.slice(0, 5).map(d => (
            <div key={d.id} className="decision-item">
              <div className="decision-header">
                <div className="decision-title">{d.title}</div>
                <div className="decision-meta">{d.phase}</div>
              </div>
              {d.body && <div className="decision-body">{d.body.substring(0, 200)}{d.body.length > 200 ? '...' : ''}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
