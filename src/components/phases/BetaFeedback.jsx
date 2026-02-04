import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SENTIMENT_OPTIONS } from '../../data/constants';
import useStore from '../../store/useStore';

export default function BetaFeedback() {
  const { getCurrentProject, addBetaFeedback } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ source: '', feedback: '', sentiment: 'neutral' });
  const project = getCurrentProject();

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.source.trim() || !form.feedback.trim()) return;
    addBetaFeedback(form.source.trim(), form.feedback.trim(), form.sentiment);
    setForm({ source: '', feedback: '', sentiment: 'neutral' });
    setShowModal(false);
  };

  const feedback = project.betaFeedback || [];
  const positive = feedback.filter(f => f.sentiment === 'positive').length;
  const neutral = feedback.filter(f => f.sentiment === 'neutral').length;
  const negative = feedback.filter(f => f.sentiment === 'negative').length;

  return (
    <div>
      {/* Stats */}
      <div className="stat-grid mb-4">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{positive}</div>
          <div className="stat-label">👍 Positive</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>{neutral}</div>
          <div className="stat-label">😐 Neutral</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-red)' }}>{negative}</div>
          <div className="stat-label">👎 Negative</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">💬 Beta Feedback</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Feedback
          </button>
        </div>
        <p className="text-muted text-sm mb-4">
          Collect and organize feedback from your beta testers.
        </p>

        {feedback.length > 0 ? (
          <div>
            {feedback.map(item => (
              <div key={item.id} className={`feedback-item ${item.sentiment}`}>
                <div className="feedback-header">
                  <div className="feedback-source">
                    {item.sentiment === 'positive' && '👍 '}
                    {item.sentiment === 'neutral' && '😐 '}
                    {item.sentiment === 'negative' && '👎 '}
                    {item.source}
                  </div>
                  <span className="text-muted text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="feedback-text">{item.feedback}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <div className="empty-state-title">No feedback yet</div>
            <div className="empty-state-text">Start collecting feedback from your beta testers</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add Beta Feedback</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Source</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Who gave this feedback? (name, role, company)"
                  value={form.source}
                  onChange={e => setForm({ ...form, source: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Feedback</label>
                <textarea
                  className="form-input tall"
                  placeholder="What did they say?"
                  value={form.feedback}
                  onChange={e => setForm({ ...form, feedback: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sentiment</label>
                <div className="flex gap-2">
                  {SENTIMENT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`btn ${form.sentiment === opt.value ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setForm({ ...form, sentiment: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Add Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
