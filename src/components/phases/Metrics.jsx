import useStore from '../../store/useStore';

export default function Metrics() {
  const { getCurrentProject, updateMetrics } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const metrics = project.metrics || {};

  const handleChange = (field) => (e) => {
    updateMetrics(field, e.target.value);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">📊 Key Metrics</div>
        </div>
        <p className="text-muted text-sm mb-4">
          Track the numbers that matter. Update these regularly to see trends.
        </p>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Users / Customers</div>
            <input
              type="text"
              className="metric-input"
              placeholder="0"
              value={metrics.users || ''}
              onChange={handleChange('users')}
            />
          </div>

          <div className="metric-card">
            <div className="metric-label">Revenue (MRR/ARR)</div>
            <input
              type="text"
              className="metric-input"
              placeholder="$0"
              value={metrics.revenue || ''}
              onChange={handleChange('revenue')}
            />
          </div>

          <div className="metric-card">
            <div className="metric-label">Conversion Rate</div>
            <input
              type="text"
              className="metric-input"
              placeholder="0%"
              value={metrics.conversion || ''}
              onChange={handleChange('conversion')}
            />
          </div>

          <div className="metric-card">
            <div className="metric-label">Churn Rate</div>
            <input
              type="text"
              className="metric-input"
              placeholder="0%"
              value={metrics.churn || ''}
              onChange={handleChange('churn')}
            />
          </div>

          <div className="metric-card">
            <div className="metric-label">NPS Score</div>
            <input
              type="text"
              className="metric-input"
              placeholder="—"
              value={metrics.nps || ''}
              onChange={handleChange('nps')}
            />
          </div>

          <div className="metric-card">
            <div className="metric-label">Custom Metric</div>
            <input
              type="text"
              className="metric-input"
              placeholder="—"
              value={metrics.custom || ''}
              onChange={handleChange('custom')}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📝 Metrics Notes</div>
        </div>
        <div className="form-group">
          <textarea
            className="form-input tall"
            placeholder="Track trends, observations, and insights about your metrics..."
            value={metrics.notes || ''}
            onChange={handleChange('notes')}
          />
        </div>
      </div>

      {/* Guidance */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💡 What to Track</div>
        </div>
        <div className="text-sm" style={{ lineHeight: '1.7' }}>
          <p className="mb-3">Focus on metrics that drive decisions:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Acquisition:</strong> How are people finding you?</li>
            <li><strong>Activation:</strong> Are they getting value quickly?</li>
            <li><strong>Retention:</strong> Do they come back?</li>
            <li><strong>Revenue:</strong> Are they paying?</li>
            <li><strong>Referral:</strong> Do they tell others?</li>
          </ul>
          <p className="mt-4 text-muted">
            Don't track vanity metrics. Track metrics you can act on.
          </p>
        </div>
      </div>
    </div>
  );
}
