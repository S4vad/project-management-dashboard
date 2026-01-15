import { Calendar, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { useMemo } from "react";

const ProjectCard = ({ project, onView, onEdit, onDelete }) => {
  const completion = useMemo(() => {
    if (project.tasks.length === 0) return 0;
    const completed = project.tasks.filter(t => t.status === 'Done').length;
    return Math.round((completed / project.tasks.length) * 100);
  }, [project.tasks]);

  const getStatusColor = (status) => {
    const colors = {
      'Planned': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700',
      'On Hold': 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'High': 'bg-red-100 text-red-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer" onClick={() => onView(project)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{project.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
        </div>
        <div className="flex space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onEdit(project)} className="p-1.5 hover:bg-gray-100 rounded">
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => onDelete(project.id)} className="p-1.5 hover:bg-gray-100 rounded">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Completion</span>
          <span className="font-semibold">{completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${completion}%` }}></div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4" />
            <span>{project.tasks.filter(t => t.status === 'Done').length}/{project.tasks.length} Tasks</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {project.assignees.slice(0, 3).map((assignee, idx) => (
              <div key={idx} className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold border-2 border-white" title={assignee}>
                {getInitials(assignee)}
              </div>
            ))}
            {project.assignees.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-semibold border-2 border-white">
                +{project.assignees.length - 3}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProjectCard;