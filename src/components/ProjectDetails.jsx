import { CheckCircle, ChevronRight, Clock, Edit2, Plus,Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import TaskForm from "./TaskForm";

const ProjectDetails = ({ project, onBack, onEdit, onUpdateTask, onAddTask }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const completion = useMemo(() => {
    if (project.tasks.length === 0) return 0;
    const completed = project.tasks.filter(t => t.status === 'Done').length;
    return Math.round((completed / project.tasks.length) * 100);
  }, [project.tasks]);

  const upcomingReminders = useMemo(() => {
    return [...project.reminders]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .filter(r => new Date(r.date) >= new Date());
  }, [project.reminders]);

  const getStatusColor = (status) => {
    const colors = {
      'Todo': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Done': 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    onUpdateTask(project.id, taskId, { status: newStatus });
  };

  const isReminderUpcoming = (date) => {
    const reminderDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((reminderDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700">
          <ChevronRight className="w-5 h-5 transform rotate-180" />
          <span className="ml-1">Back to Dashboard</span>
        </button>
        <button onClick={() => onEdit(project)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
        <p className="text-gray-600 mb-6">{project.description}</p>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-semibold mt-1">{project.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Priority</p>
            <p className="text-lg font-semibold mt-1">{project.priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="text-lg font-semibold mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-lg font-semibold mt-1">{new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Project Manager</p>
          <p className="text-lg font-semibold">{project.projectManager || 'Not assigned'}</p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Team Members</p>
          <div className="flex flex-wrap gap-2">
            {project.assignees.map((assignee, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {assignee}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-2xl font-bold text-blue-600">{completion}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${completion}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
            Tasks ({project.tasks.filter(t => t.status === 'Done').length}/{project.tasks.length})
          </h2>
          <button onClick={() => setShowTaskForm(!showTaskForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>

        {showTaskForm && (
          <div className="mb-4">
            <TaskForm 
              onSave={(task) => {
                onAddTask(project.id, task);
                setShowTaskForm(false);
              }} 
              onCancel={() => setShowTaskForm(false)} 
              assignees={project.assignees} 
            />
          </div>
        )}

        {project.tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{task.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs text-gray-500">Assigned to: <span className="font-medium">{task.assignedTo || 'Unassigned'}</span></span>
                    </div>
                  </div>
                  <select
                    value={task.status}
                    onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-0 ${getStatusColor(task.status)}`}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          Reminders ({project.reminders.length})
        </h2>

        {project.reminders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No reminders set. Edit project to add reminders.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`p-4 rounded-lg border-l-4 ${isReminderUpcoming(reminder.date) ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50 border-gray-300'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{reminder.description}</p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(reminder.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  {isReminderUpcoming(reminder.date) && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
            {project.reminders.length > upcomingReminders.length && (
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-500">+ {project.reminders.length - upcomingReminders.length} past reminders</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;  