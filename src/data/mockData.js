export const initialProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX',
    startDate: '2026-01-01',
    endDate: '2026-03-15',
    status: 'In Progress',
    priority: 'High',
    assignees: ['savad', 'uvais', 'anshif'],
    projectManager: 'savad',
    tasks: [
      { id: 1, name: 'Design mockups', description: 'Create initial design mockups', assignedTo: 'uvais', status: 'Done' },
      { id: 2, name: 'Frontend development', description: 'Build React components', assignedTo: 'anshif', status: 'In Progress' },
      { id: 3, name: 'Backend API', description: 'Setup REST API', assignedTo: 'savad', status: 'Todo' },
      { id: 4, name: 'Testing & QA', description: 'Comprehensive testing', assignedTo: 'uvais', status: 'Todo' }
    ],
    reminders: [
      { id: 1, date: '2026-01-20', description: 'Review design mockups with stakeholders' },
      { id: 2, date: '2026-02-15', description: 'Complete frontend development milestone' }
    ]
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Build native mobile application for iOS and Android',
    startDate: '2025-12-01',
    endDate: '2026-04-30',
    status: 'In Progress',
    priority: 'Medium',
    assignees: ["simith", "anoop", "abc"],
    projectManager: 'simith',
    tasks: [
      { id: 1, name: 'Setup project', description: 'Initialize React Native project', assignedTo: 'anoop', status: 'Done' },
      { id: 2, name: 'User authentication', description: 'Implement auth flow', assignedTo: 'abc', status: 'In Progress' },
      { id: 3, name: 'UI Components', description: 'Build reusable components', assignedTo: 'simith', status: 'Todo' }
    ],
    reminders: [
      { id: 1, date: '2026-01-25', description: 'Complete authentication module' }
    ]
  },
  {
    id: 3,
    name: 'Marketing Campaign Q1',
    description: 'Q1 2026 marketing initiatives and social media strategy',
    startDate: '2026-01-10',
    endDate: '2026-02-28',
    status: 'Planned',
    priority: 'Low',
    assignees: ['david','smith'],
    projectManager: 'david',
    tasks: [
      { id: 1, name: 'Create content calendar', description: 'Plan social media posts for Q1', assignedTo: 'david', status: 'Todo' }
    ],
    reminders: []
  },
  {
    id: 4,
    name: 'Database Migration',
    description: 'Migrate from MySQL to PostgreSQL',
    startDate: '2026-01-05',
    endDate: '2026-01-31',
    status: 'Completed',
    priority: 'High',
    assignees: ['tom', 'lisa'],
    projectManager: 'tom',
    tasks: [
      { id: 1, name: 'Database schema design', description: 'Design new schema', assignedTo: 'tom', status: 'Done' },
      { id: 2, name: 'Data migration script', description: 'Write migration scripts', assignedTo: 'lisa', status: 'Done' },
      { id: 3, name: 'Testing', description: 'Test data integrity', assignedTo: 'tom', status: 'Done' }
    ],
    reminders: []
  }
];

export const allAssignees = ["savad", "uvais", "anshif", "abc", "smith", "anoop"];