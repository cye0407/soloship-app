import { PHASES } from '../../data/constants';
import useStore from '../../store/useStore';

export default function PhaseProgress() {
  const { getCurrentProject, setPhase } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  return (
    <div className="phase-progress">
      {PHASES.map((phase, index) => {
        const isCompleted = index < project.phaseIndex;
        const isCurrent = index === project.phaseIndex;

        return (
          <div
            key={phase.id}
            className={`phase-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
          >
            <div
              className="phase-step-dot"
              onClick={() => setPhase(index)}
              title={`${phase.name}: ${phase.description}`}
            >
              {phase.icon}
            </div>
            <div className="phase-step-label">{phase.name}</div>
            {index < PHASES.length - 1 && <div className="phase-step-line" />}
          </div>
        );
      })}
    </div>
  );
}
