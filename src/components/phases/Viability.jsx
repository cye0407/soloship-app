import { useState } from 'react';
import useStore from '../../store/useStore';

export default function Viability() {
  const { getCurrentProject, setViabilityDecision, setPhase } = useStore();
  const project = getCurrentProject();
  const [selected, setSelected] = useState(project?.viability?.decision || null);
  const [reasoning, setReasoning] = useState(project?.viability?.reasoning || '');

  if (!project) return null;

  const handleSave = () => {
    if (!selected) return;
    setViabilityDecision(selected, reasoning);
  };

  const handleProceed = () => {
    handleSave();
    if (selected === 'go') {
      setPhase(3); // Move to Validation
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">🎯 Go / No-Go Decision</div>
        </div>
        <p className="text-muted text-sm mb-4">
          Based on your research, make a conscious decision about whether to proceed, pivot, or kill this project.
        </p>

        {/* Decision Options */}
        <div className="viability-options">
          <div
            className={`viability-option go ${selected === 'go' ? 'selected' : ''}`}
            onClick={() => setSelected('go')}
          >
            <div className="viability-option-icon">✅</div>
            <div className="viability-option-label">Go</div>
            <div className="text-sm text-muted">Proceed to validation</div>
          </div>
          <div
            className={`viability-option pivot ${selected === 'pivot' ? 'selected' : ''}`}
            onClick={() => setSelected('pivot')}
          >
            <div className="viability-option-icon">🔄</div>
            <div className="viability-option-label">Pivot</div>
            <div className="text-sm text-muted">Change direction</div>
          </div>
          <div
            className={`viability-option kill ${selected === 'kill' ? 'selected' : ''}`}
            onClick={() => setSelected('kill')}
          >
            <div className="viability-option-icon">❌</div>
            <div className="viability-option-label">Kill</div>
            <div className="text-sm text-muted">Stop this project</div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="form-group">
          <label className="form-label">
            Reasoning <span className="form-hint">Why are you making this decision?</span>
          </label>
          <textarea
            className="form-input tall"
            placeholder="Document your reasoning. What evidence supports this decision? What risks remain?"
            value={reasoning}
            onChange={e => setReasoning(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            className="btn btn-secondary"
            onClick={handleSave}
            disabled={!selected}
          >
            Save Decision
          </button>
          {selected === 'go' && (
            <button className="btn btn-primary" onClick={handleProceed}>
              Save & Move to Validation →
            </button>
          )}
        </div>

        {/* Previous Decision */}
        {project.viability && (
          <div className="mt-4" style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm text-muted mb-2">Previous decision recorded:</div>
            <div className="flex items-center gap-2">
              <strong>
                {project.viability.decision === 'go' && '✅ Go'}
                {project.viability.decision === 'pivot' && '🔄 Pivot'}
                {project.viability.decision === 'kill' && '❌ Kill'}
              </strong>
              <span className="text-muted text-sm">
                — {new Date(project.viability.decidedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Guidance */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💡 Decision Framework</div>
        </div>
        <div className="text-sm" style={{ lineHeight: '1.7' }}>
          <p className="mb-3"><strong>Go</strong> if you have:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Clear problem-solution fit hypothesis</li>
            <li>Identified reachable target audience</li>
            <li>Acceptable competitive landscape</li>
            <li>Personal motivation to see it through</li>
          </ul>

          <p className="mb-3"><strong>Pivot</strong> if:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Core problem is real but your solution isn't right</li>
            <li>Better opportunity in adjacent space</li>
            <li>Need to change target audience</li>
          </ul>

          <p className="mb-3"><strong>Kill</strong> if:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Problem isn't painful enough</li>
            <li>Market is saturated with no clear differentiation</li>
            <li>You've lost motivation</li>
            <li>Better opportunities elsewhere</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
