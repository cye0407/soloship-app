import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Decisions() {
  const { getCurrentProject, addDecision, deleteDecision } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', tags: '' });
  const project = getCurrentProject();

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const tags = form.tags.split(',').map(t => t.trim()).filter(t => t);
    addDecision(form.title.trim(), form.body, tags);
    setForm({ title: '', body: '', tags: '' });
    setShowModal(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">⚖️ Decision Log</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Log Decision
          </button>
        </div>
        <p className="text-muted text-sm mb-4">
          Record important decisions and their reasoning. Your future self will thank you.
        </p>

        {project.decisions.length > 0 ? (
          <div>
            {project.decisions.map(decision => (
              <div key={decision.id} className="decision-item">
                <div className="decision-header">
                  <div className="decision-title">{decision.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="decision-meta">{formatDate(decision.createdAt)}</span>
                    <button
                      className="btn btn-ghost btn-icon btn-sm"
                      onClick={() => deleteDecision(decision.id)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                {decision.body && <div className="decision-body">{decision.body}</div>}
                {decision.tags && decision.tags.length > 0 && (
                  <div className="decision-tags">
                    {decision.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">⚖️</div>
            <div className="empty-state-title">No decisions logged</div>
            <div className="empty-state-text">Log important decisions to build institutional memory</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Log Decision</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Decision</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="What did you decide?"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reasoning <span className="form-hint">(optional)</span></label>
                <textarea
                  className="form-input"
                  placeholder="Why did you make this decision? What alternatives did you consider?"
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tags <span className="form-hint">(comma-separated)</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. pricing, tech, scope"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Log Decision</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
