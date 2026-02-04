import { useState } from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Links() {
  const { getCurrentProject, addLink, deleteLink } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', url: '', icon: '🔗' });
  const project = getCurrentProject();

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim()) return;
    addLink(form.name.trim(), form.url.trim(), form.icon || '🔗');
    setForm({ name: '', url: '', icon: '🔗' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔗 Project Links</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Link
          </button>
        </div>
        <p className="text-muted text-sm mb-4">
          Keep all your project resources in one place.
        </p>

        {project.links.length > 0 ? (
          <div>
            {project.links.map(link => (
              <div key={link.id} className="link-item">
                <span className="link-icon">{link.icon}</span>
                <span className="link-name">{link.name}</span>
                <span className="link-url">{link.url}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-icon btn-sm"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  className="btn btn-ghost btn-icon btn-sm"
                  onClick={() => deleteLink(link.id)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔗</div>
            <div className="empty-state-title">No links yet</div>
            <div className="empty-state-text">Add links to your project resources, docs, and tools</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add Link</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. GitHub Repo, Figma Design, Landing Page"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://..."
                  value={form.url}
                  onChange={e => setForm({ ...form, url: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Icon <span className="form-hint">(emoji)</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="🔗"
                  value={form.icon}
                  onChange={e => setForm({ ...form, icon: e.target.value })}
                  style={{ width: '80px' }}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Add Link</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
