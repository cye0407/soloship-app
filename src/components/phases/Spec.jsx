import useStore from '../../store/useStore';

export default function Spec() {
  const { getCurrentProject, updateSpec } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const spec = project.spec || {};

  const handleChange = (field) => (e) => {
    updateSpec(field, e.target.value);
  };

  return (
    <div>
      {/* MVP Definition */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📐 MVP Scope</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            MVP Features <span className="form-hint">What's in v1? Be ruthless.</span>
          </label>
          <textarea
            className="form-input tall"
            placeholder="List the must-have features for first version. Cut everything that isn't essential."
            value={spec.mvpFeatures || ''}
            onChange={handleChange('mvpFeatures')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            NOT in v1 <span className="form-hint">What's explicitly out of scope?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Features you'll add later. Writing this down prevents scope creep."
            value={spec.futureFeatures || ''}
            onChange={handleChange('futureFeatures')}
          />
        </div>
      </div>

      {/* Technical */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔧 Technical Decisions</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Tech Stack <span className="form-hint">What are you building with?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Languages, frameworks, tools, hosting, etc."
            value={spec.techStack || ''}
            onChange={handleChange('techStack')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Timeline <span className="form-hint">Target milestones</span>
          </label>
          <textarea
            className="form-input"
            placeholder="When do you want to ship? What are the key milestones?"
            value={spec.timeline || ''}
            onChange={handleChange('timeline')}
          />
        </div>
      </div>

      {/* Positioning & Pricing */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💰 Positioning & Pricing</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Positioning Statement <span className="form-hint">How you'll describe this</span>
          </label>
          <textarea
            className="form-input"
            placeholder="For [target], [product] is a [category] that [key benefit]. Unlike [alternatives], we [differentiator]."
            value={spec.positioning || ''}
            onChange={handleChange('positioning')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Pricing <span className="form-hint">What will you charge?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Pricing model, tiers, and rationale. Based on validation feedback."
            value={spec.pricing || ''}
            onChange={handleChange('pricing')}
          />
        </div>
      </div>
    </div>
  );
}
