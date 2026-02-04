import { useState } from 'react';
import useStore, { PHASES } from '../store/useStore';

export default function Sidebar({ onNewProject }) {
  const { 
    projects, 
    currentProjectId, 
    setCurrentProject, 
    getCurrentProject,
    setShowSettings 
  } = useStore();
  
  const project = getCurrentProject();
  const northStar = project?.northStar || {};

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">🚀</span>
        <span>Soloship</span>
      </div>

      {/* North Star - Always Visible */}
      {project && (
        <div className="north-star">
          <div className="north-star-title">⭐ North Star</div>
          
          <NorthStarField 
            label="Problem" 
            value={northStar.problem} 
            field="problem"
          />
          <NorthStarField 
            label="Solution" 
            value={northStar.solution} 
            field="solution"
          />
          <NorthStarField 
            label="Audience" 
            value={northStar.audience} 
            field="audience"
          />
          
          <div className="north-star-stats">
            📋 {project.decisions?.length || 0} decisions
          </div>
        </div>
      )}

      {/* Phase Progress */}
      {project && (
        <div className="phase-progress-vertical">
          <div className="phase-progress-title">Phase</div>
          {PHASES.map((phase, index) => (
            <PhaseItem 
              key={phase.id}
              phase={phase}
              index={index}
              currentIndex={project.phaseIndex}
            />
          ))}
        </div>
      )}

      {/* Projects List - Collapsed */}
      <div className="projects-section">
        <div className="projects-header">
          <span className="projects-label">Projects</span>
          <button className="btn-icon-sm" onClick={onNewProject}>+</button>
        </div>
        <div className="projects-list">
          {projects.map(p => (
            <button
              key={p.id}
              className={`project-item ${p.id === currentProjectId ? 'active' : ''}`}
              onClick={() => setCurrentProject(p.id)}
            >
              <span className="project-icon">{PHASES[p.phaseIndex]?.icon}</span>
              <span className="project-name">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <button className="settings-btn" onClick={() => setShowSettings(true)}>
        ⚙️ Settings
      </button>
    </aside>
  );
}

function NorthStarField({ label, value, field }) {
  const { updateNorthStar } = useStore();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  const handleSave = () => {
    updateNorthStar(field, editValue);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="north-star-field editing">
        <div className="north-star-label">{label}</div>
        <textarea
          className="north-star-input"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
            if (e.key === 'Escape') {
              setEditValue(value || '');
              setEditing(false);
            }
          }}
          autoFocus
          rows={2}
        />
      </div>
    );
  }

  return (
    <div 
      className="north-star-field"
      onClick={() => {
        setEditValue(value || '');
        setEditing(true);
      }}
    >
      <div className="north-star-label">{label}</div>
      <div className={`north-star-value ${!value ? 'empty' : ''}`}>
        {value || 'Click to define...'}
      </div>
    </div>
  );
}

function PhaseItem({ phase, index, currentIndex }) {
  const { setPhase } = useStore();
  const isComplete = index < currentIndex;
  const isCurrent = index === currentIndex;
  const isFuture = index > currentIndex;

  return (
    <button
      className={`phase-item ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''} ${isFuture ? 'future' : ''}`}
      onClick={() => setPhase(index)}
    >
      <span className="phase-icon">{phase.icon}</span>
      <span className="phase-name">{phase.name}</span>
      {isComplete && <span className="phase-check">✓</span>}
    </button>
  );
}
