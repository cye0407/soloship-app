import { useState } from 'react';
import useStore from '../store/useStore';

export default function NewProjectModal({ onClose }) {
  const { createProject } = useStore();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createProject(name.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>New Project</h2>
        <p className="modal-desc">
          What are you building? You can change this later.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., SaaS for accountants, Coaching marketplace..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
              Start Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
