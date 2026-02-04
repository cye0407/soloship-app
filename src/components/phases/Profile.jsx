import useStore from '../../store/useStore';

export default function Profile() {
  const { getCurrentProject, updateProfile } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const p = project.profile;

  const handleChange = (field) => (e) => {
    updateProfile(field, e.target.value);
  };

  return (
    <div>
      {/* North Star - One-liners */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">⭐ North Star (One-Liners)</div>
        </div>
        <p className="text-muted text-sm mb-4">
          These should be short enough to remember. They appear in your sidebar at all times.
        </p>

        <div className="form-group">
          <label className="form-label">
            Problem <span className="form-hint">What pain are you solving?</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="One sentence: what's the core problem?"
            value={p.problemOneLiner}
            onChange={handleChange('problemOneLiner')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Solution <span className="form-hint">How do you solve it?</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="One sentence: what's your solution?"
            value={p.solutionOneLiner}
            onChange={handleChange('solutionOneLiner')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Audience <span className="form-hint">Who is this for?</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="One sentence: who's your ideal customer?"
            value={p.audienceOneLiner}
            onChange={handleChange('audienceOneLiner')}
          />
        </div>
      </div>

      {/* Detailed Profile */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Full Profile</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Problem (detailed) <span className="form-hint">The full picture of the pain</span>
          </label>
          <textarea
            className="form-input tall"
            placeholder="Describe the problem in detail. Who has it? How severe? What do they do today?"
            value={p.problem}
            onChange={handleChange('problem')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Solution (detailed) <span className="form-hint">How your product/service works</span>
          </label>
          <textarea
            className="form-input tall"
            placeholder="Describe your solution. What does it do? How does it work? What's the experience?"
            value={p.solution}
            onChange={handleChange('solution')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Target Audience <span className="form-hint">Be specific about who you're building for</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Demographics, psychographics, behaviors. Who's the ideal first customer?"
            value={p.audience}
            onChange={handleChange('audience')}
          />
        </div>
      </div>

      {/* Why You, Why Now */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🎯 Why You, Why Now</div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Why You? <span className="form-hint">Your unfair advantage</span>
          </label>
          <textarea
            className="form-input"
            placeholder="What makes you uniquely qualified to solve this problem?"
            value={p.whyYou}
            onChange={handleChange('whyYou')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Why Now? <span className="form-hint">Market timing</span>
          </label>
          <textarea
            className="form-input"
            placeholder="What's changed that makes this the right time?"
            value={p.whyNow}
            onChange={handleChange('whyNow')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Differentiator <span className="form-hint">What makes you different from alternatives?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Why would someone choose you over existing options?"
            value={p.differentiator}
            onChange={handleChange('differentiator')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Pricing Hypothesis <span className="form-hint">What will you charge?</span>
          </label>
          <textarea
            className="form-input"
            placeholder="Initial pricing model and rationale. This will be validated later."
            value={p.pricingHypothesis}
            onChange={handleChange('pricingHypothesis')}
          />
        </div>
      </div>
    </div>
  );
}
