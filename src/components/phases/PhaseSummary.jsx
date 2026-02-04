import { PHASES } from '../../data/constants';
import useStore from '../../store/useStore';

export default function PhaseSummary() {
  const { getCurrentProject, setPhase } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const phase = PHASES[project.phaseIndex];
  const completedTasks = project.tasks.filter(t => t.completed).length;
  const totalTasks = project.tasks.length;
  const pendingTasks = project.tasks.filter(t => !t.completed).slice(0, 5);
  const recentDecisions = project.decisions.slice(0, 3);
  const recentEvidence = project.evidence.slice(0, 3);

  const canAdvance = project.phaseIndex < PHASES.length - 1;
  const nextPhase = canAdvance ? PHASES[project.phaseIndex + 1] : null;

  // Phase-specific status checks
  const getPhaseStatus = () => {
    switch (phase.id) {
      case 'intake':
        const profileComplete = project.profile.problemOneLiner && 
          project.profile.solutionOneLiner && 
          project.profile.audienceOneLiner;
        return profileComplete ? '✅ Profile complete' : '⏳ Complete your profile';
      case 'research':
        return project.evidence.length > 0 
          ? `✅ ${project.evidence.length} evidence items collected` 
          : '⏳ Collect research evidence';
      case 'viability':
        return project.viability 
          ? `✅ Decision made: ${project.viability.decision.toUpperCase()}` 
          : '⏳ Make go/no-go decision';
      case 'validation':
        return completedTasks > 0 
          ? `✅ ${completedTasks}/${totalTasks} tasks done` 
          : '⏳ Complete validation tasks';
      case 'definition':
        return project.spec?.mvpFeatures 
          ? '✅ MVP spec defined' 
          : '⏳ Define your MVP spec';
      case 'build':
        return project.buildProgress?.currentMilestone 
          ? `🏗️ ${project.buildProgress.currentMilestone}` 
          : '⏳ Track your build progress';
      case 'beta':
        return project.betaFeedback?.length > 0 
          ? `✅ ${project.betaFeedback.length} feedback items` 
          : '⏳ Collect beta feedback';
      case 'launch':
        const launchDone = project.launchChecklist?.filter(i => i.completed).length || 0;
        const launchTotal = project.launchChecklist?.length || 0;
        return `${launchDone}/${launchTotal} checklist items`;
      case 'operations':
        return '📊 Ongoing operations';
      default:
        return '';
    }
  };

  return (
    <div>
      {/* Phase Status Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Status</div>
          <div className="phase-status-badge">{getPhaseStatus()}</div>
        </div>
        <p className="text-muted text-sm mb-3">{phase.guidance}</p>
        <p className="text-sm"><strong>Done when:</strong> {phase.doneWhen}</p>
      </div>

      {/* Quick Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">{completedTasks}/{totalTasks}</div>
          <div className="stat-label">Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{project.evidence.length}</div>
          <div className="stat-label">Evidence</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{project.decisions.length}</div>
          <div className="stat-label">Decisions</div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">⏳ Next Up</div>
          </div>
          {pendingTasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-checkbox" />
              <span className="task-text">{task.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recent Evidence */}
      {recentEvidence.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">🔬 Recent Evidence</div>
          </div>
          {recentEvidence.map(ev => (
            <div key={ev.id} className="evidence-item" style={{ marginBottom: '8px' }}>
              <div className="evidence-type">{ev.type}</div>
              <div className="evidence-title">{ev.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Decisions */}
      {recentDecisions.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">📝 Recent Decisions</div>
          </div>
          {recentDecisions.map(decision => (
            <div key={decision.id} className="decision-item" style={{ marginBottom: '8px' }}>
              <div className="decision-title">{decision.title}</div>
              <div className="decision-meta">{decision.phase} phase</div>
            </div>
          ))}
        </div>
      )}

      {/* Advance Phase */}
      {canAdvance && (
        <div className="card" style={{ background: 'var(--accent-purple-soft)', borderColor: 'var(--accent-purple)' }}>
          <div className="card-header">
            <div className="card-title">Ready for next phase?</div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setPhase(project.phaseIndex + 1)}
          >
            Move to {nextPhase.icon} {nextPhase.name} →
          </button>
        </div>
      )}
    </div>
  );
}
