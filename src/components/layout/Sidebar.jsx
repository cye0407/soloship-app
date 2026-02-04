import { PHASES } from '../../data/constants';
import useStore from '../../store/useStore';

export default function Sidebar() {
  const { projects, currentProjectId, setCurrentProject } = useStore();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">🚀</div>
        Soloship
      </div>
      <div className="tagline">Solo founder command center</div>

      {/* Projects */}
      <div className="nav-section">
        <div className="nav-label">Projects</div>
        {projects.map(p => (
          <button
            key={p.id}
            className={`nav-item ${p.id === currentProjectId ? 'active' : ''}`}
            onClick={() => setCurrentProject(p.id)}
          >
            <span className="nav-item-icon">{PHASES[p.phaseIndex]?.icon || '📝'}</span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Add Project Button - Future */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button className="btn btn-secondary" style={{ width: '100%' }} disabled>
          + New Project
        </button>
        <div className="text-muted text-sm" style={{ marginTop: '8px', textAlign: 'center' }}>
          Coming soon
        </div>
      </div>
    </aside>
  );
}
