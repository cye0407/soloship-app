import { useState } from 'react';
import { X, Check } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Tasks() {
  const { getCurrentProject, addTask, toggleTask, deleteTask } = useStore();
  const [newTask, setNewTask] = useState('');
  const project = getCurrentProject();

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask.trim(), 'validation');
    setNewTask('');
  };

  const pendingTasks = project.tasks.filter(t => !t.completed);
  const completedTasks = project.tasks.filter(t => t.completed);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">✅ Validation Tasks</div>
        </div>
        <p className="text-muted text-sm mb-4">
          Track what you need to do to validate your assumptions. Interview users, run tests, collect evidence.
        </p>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            className="form-input"
            placeholder="Add a validation task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

        {/* Pending Tasks */}
        {pendingTasks.length > 0 ? (
          <div>
            {pendingTasks.map(task => (
              <div key={task.id} className="task-item">
                <div
                  className="task-checkbox"
                  onClick={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
                <div className="task-actions">
                  <button
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-title">No tasks yet</div>
            <div className="empty-state-text">Add validation tasks to track your progress</div>
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">✓ Completed ({completedTasks.length})</div>
          </div>
          {completedTasks.map(task => (
            <div key={task.id} className="task-item">
              <div
                className="task-checkbox checked"
                onClick={() => toggleTask(task.id)}
              >
                <Check size={12} />
              </div>
              <span className="task-text completed">{task.text}</span>
              <div className="task-actions">
                <button
                  className="btn btn-ghost btn-icon btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
