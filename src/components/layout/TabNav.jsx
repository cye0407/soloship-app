import { PHASES } from '../../data/constants';
import useStore from '../../store/useStore';

const TAB_LABELS = {
  'phase-summary': 'Summary',
  'profile': 'Profile',
  'evidence': 'Evidence',
  'viability': 'Go/No-Go',
  'tasks': 'Tasks',
  'resources': 'Resources',
  'spec': 'Spec',
  'links': 'Links',
  'build-progress': 'Progress',
  'beta-feedback': 'Feedback',
  'launch-checklist': 'Checklist',
  'metrics': 'Metrics'
};

// Phase-specific tabs (decisions removed - it's now persistent/global)
const PHASE_TABS = {
  'intake': ['phase-summary', 'profile'],
  'research': ['phase-summary', 'profile', 'evidence', 'links'],
  'viability': ['phase-summary', 'viability', 'evidence'],
  'validation': ['phase-summary', 'tasks', 'evidence', 'resources'],
  'definition': ['phase-summary', 'spec', 'links'],
  'build': ['phase-summary', 'build-progress', 'spec', 'links'],
  'beta': ['phase-summary', 'beta-feedback', 'tasks', 'links'],
  'launch': ['phase-summary', 'launch-checklist', 'links'],
  'operations': ['phase-summary', 'metrics', 'links'],
};

export default function TabNav() {
  const { currentTab, setCurrentTab, getCurrentProject } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const phase = PHASES[project.phaseIndex];
  const tabs = PHASE_TABS[phase.id] || ['phase-summary'];

  return (
    <div className="phase-tabs">
      <div className="phase-tabs-header">
        <span className="phase-tabs-label">{phase.icon} {phase.name}</span>
      </div>
      <div className="phase-tabs-nav">
        {tabs.map(tabId => (
          <button
            key={tabId}
            className={`phase-tab ${currentTab === tabId ? 'active' : ''}`}
            onClick={() => setCurrentTab(tabId)}
          >
            {TAB_LABELS[tabId] || tabId}
          </button>
        ))}
      </div>
    </div>
  );
}
