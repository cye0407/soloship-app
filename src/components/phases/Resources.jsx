export default function Resources() {
  return (
    <div>
      {/* DIY Templates */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📝 DIY Templates & Guides</div>
          <span className="resource-badge free">Free</span>
        </div>
        <p className="text-muted text-sm mb-4">
          Everything you need to run your own validation.
        </p>

        <div className="resource-grid">
          <div className="resource-item">
            <div className="resource-item-icon">✉️</div>
            <div>
              <div className="resource-item-title">Outreach Templates</div>
              <div className="resource-item-desc">
                LinkedIn, email, and community post scripts that don't feel spammy
              </div>
            </div>
          </div>

          <div className="resource-item">
            <div className="resource-item-icon">🎤</div>
            <div>
              <div className="resource-item-title">Interview Scripts</div>
              <div className="resource-item-desc">
                Questions to ask, how to probe, what to listen for
              </div>
            </div>
          </div>

          <div className="resource-item">
            <div className="resource-item-icon">🚪</div>
            <div>
              <div className="resource-item-title">"Fake Door" Test Guide</div>
              <div className="resource-item-desc">
                How to test demand before building anything
              </div>
            </div>
          </div>

          <div className="resource-item">
            <div className="resource-item-icon">🎯</div>
            <div>
              <div className="resource-item-title">Where to Find Testers</div>
              <div className="resource-item-desc">
                Communities, platforms, and tactics by industry
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Tools */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔧 Recommended Tools</div>
          <span className="resource-badge partner">Curated</span>
        </div>
        <p className="text-muted text-sm mb-4">
          Tools we recommend for validation.
        </p>

        <div className="resources-section">
          <div className="resources-section-title">Landing Page Builders</div>
          <div className="resource-grid">
            <div className="resource-item">
              <div className="resource-item-icon">🌐</div>
              <div>
                <div className="resource-item-title">Carrd</div>
                <div className="resource-item-desc">Simple, cheap, fast. Great for MVPs.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">🎨</div>
              <div>
                <div className="resource-item-title">Typedream</div>
                <div className="resource-item-desc">More design flexibility, Notion-like.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">⚡</div>
              <div>
                <div className="resource-item-title">Framer</div>
                <div className="resource-item-desc">Powerful, production-ready sites.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <div className="resources-section-title">Survey & Research Tools</div>
          <div className="resource-grid">
            <div className="resource-item">
              <div className="resource-item-icon">📋</div>
              <div>
                <div className="resource-item-title">Tally</div>
                <div className="resource-item-desc">Free tier, clean UX, best value.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">📝</div>
              <div>
                <div className="resource-item-title">Typeform</div>
                <div className="resource-item-desc">Polished, but pricier.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">🔬</div>
              <div>
                <div className="resource-item-title">User Interviews</div>
                <div className="resource-item-desc">Recruit research participants.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <div className="resources-section-title">Analytics</div>
          <div className="resource-grid">
            <div className="resource-item">
              <div className="resource-item-icon">📊</div>
              <div>
                <div className="resource-item-title">Plausible</div>
                <div className="resource-item-desc">Privacy-focused, simple analytics.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">🔥</div>
              <div>
                <div className="resource-item-title">PostHog</div>
                <div className="resource-item-desc">Product analytics, feature flags.</div>
              </div>
            </div>
            <div className="resource-item">
              <div className="resource-item-icon">🖱️</div>
              <div>
                <div className="resource-item-title">Hotjar</div>
                <div className="resource-item-desc">Heatmaps, recordings, feedback.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Marketplace (Future) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">👥 Validation Experts</div>
          <span className="resource-badge" style={{ background: 'var(--accent-rose-soft)', color: 'var(--accent-rose)' }}>Coming Soon</span>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">Expert Marketplace Coming Soon</div>
          <div className="empty-state-text">
            We're building a directory of validation specialists — researchers, landing page experts, and interview pros who understand the solo founder journey.
          </div>
        </div>
      </div>
    </div>
  );
}
