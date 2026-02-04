import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { EVIDENCE_TYPES } from '../../data/constants';
import useStore from '../../store/useStore';

export default function Evidence() {
  const { getCurrentProject, addEvidence, deleteEvidence } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'Interview', title: '', body: '', source: '' });
  const project = getCurrentProject();

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addEvidence(form.type, form.title.trim(), form.body, form.source);
    setForm({ type: 'Interview', title: '', body: '', source: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔬 Evidence Collection</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Evidence
          </button>
        </div>
        <p className="text-muted text-sm mb-4">
          Document what you learn from research, interviews, and tests. This is proof that you validated assumptions.
        </p>

        {project.evidence.length > 0 ? (
          <div>
            {project.evidence.map(item => (
              <div key={item.id} className="evidence-item">
                <div className="evidence-header">
                  <div>
                    <div className="evidence-type">{item.type}</div>
                    <div className="evidence-title">{item.title}</div>
                  </div>
                  <button
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => deleteEvidence(item.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
                {item.body && <div className="evidence-body">{item.body}</div>}
                {item.source && <div className="evidence-source">Source: {item.source}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔬</div>
            <div className="empty-state-title">No evidence yet</div>
            <div className="empty-state-text">Start collecting evidence from your validation activities</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add Evidence</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-input"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  {EVIDENCE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Brief summary of what you learned"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Details</label>
                <textarea
                  className="form-input"
                  placeholder="Full notes, quotes, or findings"
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Source <span className="form-hint">(optional)</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Link, person's name, or reference"
                  value={form.source}
                  onChange={e => setForm({ ...form, source: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Add Evidence</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
