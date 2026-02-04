import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Phase definitions - updated flow with validation gates throughout
export const PHASES = [
  { 
    id: 'intake', 
    name: 'Intake', 
    icon: 'I',
    description: 'Define your North Star',
    doneWhen: 'North Star is clear and challenged',
    gate: null,
    claudeRole: 'Challenge your thinking. Extract the North Star. Push for clarity.'
  },
  { 
    id: 'landing', 
    name: 'Landing Page', 
    icon: 'L',
    description: 'Put your idea into the world',
    doneWhen: 'Live URL submitted',
    gate: 'Paste your live landing page URL to continue',
    claudeRole: 'Review landing page. Critique the messaging. Confirm it is live.'
  },
  { 
    id: 'research', 
    name: 'Research', 
    icon: 'R',
    description: 'Find your audience and competitors',
    doneWhen: 'Know where to post, who competitors are',
    gate: null,
    claudeRole: 'Find where audience hangs out. Analyze competitors. Draft outreach posts.'
  },
  { 
    id: 'outreach', 
    name: 'Outreach', 
    icon: 'O',
    description: 'Post and track responses',
    doneWhen: 'Posted in 3+ places with tracking',
    gate: 'Submit links to your posts',
    claudeRole: 'Track where you posted. Monitor responses. Analyze feedback.'
  },
  { 
    id: 'viability', 
    name: 'Viability', 
    icon: 'V',
    description: 'Go or no-go decision',
    doneWhen: 'Decision made with evidence',
    gate: 'Minimum 5 signups or 10 meaningful responses',
    claudeRole: 'Review evidence. Play devil\'s advocate. Force the decision.'
  },
  { 
    id: 'definition', 
    name: 'Definition', 
    icon: 'D',
    description: 'Scope the MVP',
    doneWhen: 'Clear spec, no scope creep',
    gate: null,
    claudeRole: 'Challenge scope creep. Force MVP discipline.'
  },
  { 
    id: 'build', 
    name: 'Build', 
    icon: 'B',
    description: 'Make the thing',
    doneWhen: 'Working product ready for beta',
    gate: 'Demo link or screenshots',
    claudeRole: 'Check progress. Identify blockers. Keep you accountable.'
  },
  { 
    id: 'beta', 
    name: 'Beta', 
    icon: 'T',
    description: 'Real users, real feedback',
    doneWhen: 'Enough signal to launch or pivot',
    gate: 'Minimum 5 beta user feedback items',
    claudeRole: 'Structure feedback collection. Synthesize patterns.'
  },
  { 
    id: 'launch', 
    name: 'Launch', 
    icon: 'G',
    description: 'Go live',
    doneWhen: 'Product publicly available',
    gate: 'Checklist complete',
    claudeRole: 'Review checklist. Challenge readiness.'
  },
  { 
    id: 'operations', 
    name: 'Operations', 
    icon: 'S',
    description: 'Run and grow',
    doneWhen: 'Ongoing',
    gate: null,
    claudeRole: 'Review metrics. Suggest focus areas.'
  }
];

const createEmptyProject = (name = 'New Project') => ({
  id: Date.now().toString(),
  name,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  phaseIndex: 0,
  
  // North Star - always visible
  northStar: {
    problem: '',
    solution: '',
    audience: ''
  },
  
  // Landing page gate
  landingPageUrl: '',
  
  // Outreach tracking
  outreach: {
    posts: [], // { platform, url, postedAt, responses }
    totalResponses: 0,
    signups: 0
  },
  
  // Research findings
  research: {
    competitors: [],
    audienceLocations: [], // where they hang out
    draftPosts: [], // platform-specific drafts
    findings: ''
  },
  
  // Viability
  viability: {
    decision: null, // 'go' | 'pivot' | 'kill'
    reasoning: '',
    evidence: []
  },
  
  // Definition
  definition: {
    mvpFeatures: '',
    notInMvp: '',
    techStack: '',
    timeline: '',
    pricing: ''
  },
  
  // Build
  build: {
    currentMilestone: '',
    completed: [],
    blockers: [],
    demoUrl: ''
  },
  
  // Beta
  beta: {
    testers: [],
    feedback: [],
    patterns: []
  },
  
  // Launch
  launch: {
    checklist: [
      { id: '1', text: 'Landing page updated for launch', done: false },
      { id: '2', text: 'Payment processing works', done: false },
      { id: '3', text: 'Legal (terms, privacy)', done: false },
      { id: '4', text: 'Analytics installed', done: false },
      { id: '5', text: 'Launch announcement ready', done: false }
    ],
    launchDate: null
  },
  
  // Operations
  operations: {
    metrics: {
      users: '',
      revenue: '',
      churn: '',
      nps: ''
    },
    notes: ''
  },
  
  // Persistent across phases
  decisions: [],
  conversations: {} // keyed by phase
});

const useStore = create(
  persist(
    (set, get) => ({
      // Commitment gate
      hasSeenCommitment: false,
      setHasSeenCommitment: (seen) => set({ hasSeenCommitment: seen }),
      
      // API Key
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
      
      // Projects
      projects: [],
      currentProjectId: null,
      
      // UI State
      showSettings: false,
      setShowSettings: (show) => set({ showSettings: show }),
      
      // Getters
      getCurrentProject: () => {
        const { projects, currentProjectId } = get();
        return projects.find(p => p.id === currentProjectId) || null;
      },
      
      getCurrentPhase: () => {
        const project = get().getCurrentProject();
        if (!project) return null;
        return PHASES[project.phaseIndex];
      },
      
      // Project Actions
      createProject: (name) => {
        const project = createEmptyProject(name);
        set(state => ({
          projects: [...state.projects, project],
          currentProjectId: project.id
        }));
        return project;
      },
      
      setCurrentProject: (id) => set({ currentProjectId: id }),
      
      updateProject: (updates) => {
        const { currentProjectId } = get();
        if (!currentProjectId) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === currentProjectId 
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          )
        }));
      },
      
      // North Star
      updateNorthStar: (field, value) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  northStar: { ...p.northStar, [field]: value },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      },
      
      // Landing Page
      setLandingPageUrl: (url) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { ...p, landingPageUrl: url, updatedAt: new Date().toISOString() }
              : p
          )
        }));
      },
      
      // Outreach
      addOutreachPost: (platform, url) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        const post = {
          id: Date.now().toString(),
          platform,
          url,
          postedAt: new Date().toISOString(),
          responses: 0,
          notes: ''
        };
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  outreach: {
                    ...p.outreach,
                    posts: [...p.outreach.posts, post]
                  },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      },
      
      updateOutreachStats: (signups, totalResponses) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  outreach: {
                    ...p.outreach,
                    signups,
                    totalResponses
                  },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      },
      
      // Phase Navigation
      setPhase: (index) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { ...p, phaseIndex: index, updatedAt: new Date().toISOString() }
              : p
          )
        }));
      },
      
      advancePhase: () => {
        const project = get().getCurrentProject();
        if (!project || project.phaseIndex >= PHASES.length - 1) return;
        get().setPhase(project.phaseIndex + 1);
      },
      
      // Phase Data
      updatePhaseData: (phase, data) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  [phase]: { ...p[phase], ...data },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      },
      
      // Decisions
      addDecision: (title, body, tags = []) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        const decision = {
          id: Date.now().toString(),
          title,
          body,
          tags,
          phase: PHASES[project.phaseIndex].id,
          createdAt: new Date().toISOString()
        };
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  decisions: [decision, ...p.decisions],
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      },
      
      // Conversations (per phase)
      getConversation: (phase) => {
        const project = get().getCurrentProject();
        if (!project) return [];
        return project.conversations[phase] || [];
      },
      
      addMessage: (phase, role, content) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        const message = {
          id: Date.now().toString(),
          role,
          content,
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  conversations: {
                    ...p.conversations,
                    [phase]: [...(p.conversations[phase] || []), message]
                  },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
        
        return message;
      },
      
      clearConversation: (phase) => {
        const project = get().getCurrentProject();
        if (!project) return;
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === project.id 
              ? { 
                  ...p, 
                  conversations: {
                    ...p.conversations,
                    [phase]: []
                  },
                  updatedAt: new Date().toISOString()
                }
              : p
          )
        }));
      }
    }),
    {
      name: 'soloship-v3',
      version: 3
    }
  )
);

export default useStore;
