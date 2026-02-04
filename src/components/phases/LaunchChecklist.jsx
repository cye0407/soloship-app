import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import useStore from '../../store/useStore';

export default function LaunchChecklist() {
  const { getCurrentProject, toggleLaunchItem, addLaunchItem } = useStore();
  const [newItem, setNewItem] = useState('');
  const project = getCurrentProject();

  if (!project) return null;

  const checklist = project.launchChecklist || [];
  const completed = checklist.filter(i => i.completed).length;
  const total = checklist.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addLaunchItem(newItem.trim());
    setNewItem('');
  };

  return (
    <div>
      {/* Progress */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🚀 Launch Progress</div>
          <span className="text-muted">{completed}/{total} complete</span>
        </div>
        <div style={{ 
          height: '8px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: progress === 100 ? 'var(--accent-green)' : 'var(--accent-purple)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        {progress === 100 && (
          <div className="mt-4" style={{ padding: '16px', background: 'var(--accent-green-soft)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</div>
            <div style={{ fontWeight: '600', color: 'var(--accent-green)' }}>Ready to launch!</div>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📋 Launch Checklist</div>
        </div>

        {checklist.map(item => (
          <div key={item.id} className="task-item">
            <div
              className={`task-checkbox ${item.completed ? 'checked' : ''}`}
              onClick={() => toggleLaunchItem(item.id)}
            >
              {item.completed && <Check size={12} />}
            </div>
            <span className={`task-text ${item.completed ? 'completed' : ''}`}>
              {item.text}
            </span>
          </div>
        ))}

        {/* Add Item */}
        <form onSubmit={handleAdd} className="flex gap-2 mt-4">
          <input
            type="text"
            className="form-input"
            placeholder="Add checklist item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary">
            <Plus size={16} />
          </button>
        </form>
      </div>

      {/* Launch Resources */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💡 Launch Tips</div>
        </div>
        <div className="text-sm" style={{ lineHeight: '1.7' }}>
          <p className="mb-3"><strong>Before launch:</strong></p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Test all critical user flows</li>
            <li>Set up error monitoring (Sentry, LogRocket)</li>
            <li>Prepare support channels</li>
            <li>Have a rollback plan</li>
          </ul>

          <p className="mb-3"><strong>Launch day:</strong></p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Post on Product Hunt, Hacker News, Twitter</li>
            <li>Email your beta users and waitlist</li>
            <li>Monitor for issues closely</li>
            <li>Respond quickly to early feedback</li>
          </ul>

          <p className="mb-3"><strong>After launch:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Send thank-you notes to supporters</li>
            <li>Document lessons learned</li>
            <li>Celebrate! 🎉</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
