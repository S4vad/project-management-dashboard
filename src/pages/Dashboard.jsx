import { useMemo, useState } from "react";
import { Plus, Search, FolderKanban, X, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';
import StatsCard from "../components/StatsCard";
import ProjectCard from "../components/ProjectCard";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import { initialProjects, allAssignees } from "../data/mockData";

function Dashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [view, setView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const stats = useMemo(() => ({
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    totalTasks: projects.reduce((sum, p) => sum + p.tasks.length, 0),
    completedTasks: projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'Done').length, 0)
  }), [projects]);

  const filteredProjects = useMemo(() => 
    projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || p.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    }), [projects, searchTerm, filterStatus, filterPriority]);

  const updateProjectsAndSync = (newProjects) => {
    setProjects(newProjects);
    if (selectedProject) {
      const updated = newProjects.find(p => p.id === selectedProject.id);
      if (updated) setSelectedProject(updated);
    }
  };

  const handleCreateProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      tasks: projectData.tasks || []
    };
    setProjects([...projects, newProject]);
    setShowCreateModal(false);
  };

  const handleUpdateProject = (updatedProject) => {
    const newProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    updateProjectsAndSync(newProjects);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProject?.id === id) {
        setView('dashboard');
        setSelectedProject(null);
      }
    }
  };

  const handleAddTask = (projectId, task) => {
    const project = projects.find(p => p.id === projectId);
    const newTask = { ...task, id: Math.max(...project.tasks.map(t => t.id), 0) + 1 };
    const newProjects = projects.map(p => 
      p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    updateProjectsAndSync(newProjects);
  };

  const handleUpdateTask = (projectId, taskId, updates) => {
    const newProjects = projects.map(p => 
      p.id === projectId ? {
        ...p,
        tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
      } : p
    );
    updateProjectsAndSync(newProjects);
  };

  const statsConfig = [
    { title: "Total Projects", value: stats.total, icon: FolderKanban, color: "#3B82F6", subtitle: "All projects" },
    { title: "In Progress", value: stats.inProgress, icon: TrendingUp, color: "#F59E0B", subtitle: "Active projects" },
    { title: "Completed", value: stats.completed, icon: CheckCircle, color: "#10B981", subtitle: "Finished projects" },
    { title: "Task Completion", value: `${stats.completedTasks}/${stats.totalTasks}`, icon: BarChart3, color: "#8B5CF6", 
      subtitle: `${Math.round((stats.completedTasks/stats.totalTasks)*100)}% complete` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderKanban className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Project Management System</h1>
            </div>
            {view === 'dashboard' && (
              <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center shadow-sm">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsConfig.map((stat, idx) => <StatsCard key={idx} {...stat} />)}
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Status</option>
                  {['Planned', 'In Progress', 'Completed', 'On Hold'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Priority</option>
                  {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <FolderKanban className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? 'Try adjusting your filters' : 'Get started by creating your first project'}
                </p>
                {!searchTerm && filterStatus === 'all' && filterPriority === 'all' && (
                  <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Project
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} 
                    onView={(p) => { setSelectedProject(p); setView('details'); }}
                    onEdit={setEditingProject} onDelete={handleDeleteProject} />
                ))}
              </div>
            )}
          </>
        ) : (
          <ProjectDetails project={selectedProject} onBack={() => setView('dashboard')} 
            onEdit={setEditingProject} onUpdateTask={handleUpdateTask} onAddTask={handleAddTask} />
        )}
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ProjectForm onSave={handleCreateProject} onCancel={() => setShowCreateModal(false)} allAssignees={allAssignees} />
            </div>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
              <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ProjectForm project={editingProject} onSave={handleUpdateProject} onCancel={() => setEditingProject(null)} allAssignees={allAssignees} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;