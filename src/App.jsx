import { useState, useEffect } from 'react';
import useStore, { PHASES } from './store/useStore';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import ApiKeyModal from './components/ApiKeyModal';
import NewProjectModal from './components/NewProjectModal';
import CommitmentGate from './components/CommitmentGate';

export default function App() {
  const { apiKey, projects, currentProjectId, getCurrentProject, createProject, hasSeenCommitment, setHasSeenCommitment } = useStore();
  const [showNewProject, setShowNewProject] = useState(false);
  
  const project = getCurrentProject();
  
  // Show API key modal if no key
  if (!apiKey) {
    return <ApiKeyModal />;
  }
  
  // Show commitment gate after first login (before any projects)
  if (!hasSeenCommitment) {
    return <CommitmentGate onCommit={() => setHasSeenCommitment(true)} />;
  }
  
  // Show new project prompt if no projects
  if (projects.length === 0) {
    return (
      <div className="app">
        <div className="empty-state-full">
          <div className="empty-state-icon">Ship</div>
          <h1>Welcome to Soloship</h1>
          <p>Your tough co-founder for building solo.</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setShowNewProject(true)}
          >
            Start Your First Project
          </button>
        </div>
        {showNewProject && (
          <NewProjectModal onClose={() => setShowNewProject(false)} />
        )}
      </div>
    );
  }
  
  // Show new project modal if no current project
  if (!project) {
    return (
      <div className="app">
        <Sidebar onNewProject={() => setShowNewProject(true)} />
        <main className="main">
          <div className="empty-state">
            <div className="empty-state-title">Select a project</div>
          </div>
        </main>
        {showNewProject && (
          <NewProjectModal onClose={() => setShowNewProject(false)} />
        )}
      </div>
    );
  }

  const phase = PHASES[project.phaseIndex];

  return (
    <div className="app">
      <Sidebar onNewProject={() => setShowNewProject(true)} />
      <Chat project={project} phase={phase} />
      {showNewProject && (
        <NewProjectModal onClose={() => setShowNewProject(false)} />
      )}
    </div>
  );
}
