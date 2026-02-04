import useStore from '../../store/useStore';

export default function BuildProgress() {
  const { getCurrentProject, updateBuildProgress } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const bp = project.buildProgress || {};

  const handleChange = (field) => (e) => {
    updateBuildProgress(field, e.target.value);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔨 Build Progress</div>
        </div>
        <p className="text-muted text-sm mb-4">
          Track your build progress. Stay focused on MVP scope.
        </p>

        <div className="form-group">
          <label className="form-label">
            Current Milestone <span className="form-hint">What are you working on now?</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Phase 1: Core authentication"
            value={bp.currentMilestone || ''}
            onChange={handleChange('currentMilestone')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Completed <span className="form-hint">What's done?</span>
          </label>
          <textarea
            className="form-input tall"
            placeholder="List completed items. Celebrate progress!"
            value={bp.completedItems || ''}
            onChange={handleChange('completedItems')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Blockers <span className="form-hint">What's slowing you down?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Technical challenges, dependencies, decisions needed..."
            value={bp.blockers || ''}
            onChange={handleChange('blockers')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Next Steps <span className="form-hint">What's next?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Immediate next tasks to complete"
            value={bp.nextSteps || ''}
            onChange={handleChange('nextSteps')}
          />
        </div>
      </div>

      {/* Quick Reference to Spec */}
      {project.spec?.mvpFeatures && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">📐 MVP Spec Reference</div>
          </div>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {project.spec.mvpFeatures}
          </div>
        </div>
      )}
    </div>
  );
}
