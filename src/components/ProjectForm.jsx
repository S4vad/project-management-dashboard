import { X } from "lucide-react";
import { useState } from "react";

const ProjectForm = ({ project, onSave, onCancel, allAssignees }) => {
  const [formData, setFormData] = useState(project || {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    assignees: [],
    projectManager: '',
    status: 'Planned',
    priority: 'Medium',
    reminders: []
  });
  const [errors, setErrors] = useState({});
  const [newReminder, setNewReminder] = useState({ date: '', description: '' });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (formData.endDate && formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (formData.assignees.length === 0) newErrors.assignees = 'At least one assignee is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleAddReminder = () => {
    if (newReminder.date && newReminder.description) {
      setFormData({
        ...formData,
        reminders: [...formData.reminders, { ...newReminder, id: Date.now() }]
      });
      setNewReminder({ date: '', description: '' });
    }
  };

  const handleRemoveReminder = (id) => {
    setFormData({
      ...formData,
      reminders: formData.reminders.filter(r => r.id !== id)
    });
  };

  const toggleAssignee = (assignee) => {
    const isSelected = formData.assignees.includes(assignee);
    setFormData({
      ...formData,
      assignees: isSelected 
        ? formData.assignees.filter(a => a !== assignee)
        : [...formData.assignees, assignee]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter project name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Enter project description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assignees * (Select multiple)</label>
        <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
          {allAssignees.map((assignee) => (
            <label key={assignee} className="flex items-center space-x-2 py-1.5 hover:bg-gray-50 px-2 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={formData.assignees.includes(assignee)}
                onChange={() => toggleAssignee(assignee)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">{assignee}</span>
            </label>
          ))}
        </div>
        {errors.assignees && <p className="text-red-500 text-xs mt-1">{errors.assignees}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
        <select
          value={formData.projectManager}
          onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Project Manager</option>
          {formData.assignees.map((assignee) => (
            <option key={assignee} value={assignee}>{assignee}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reminders</label>
        <div className="space-y-2 mb-3">
          {formData.reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium">{new Date(reminder.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-600">{reminder.description}</p>
              </div>
              <button type="button" onClick={() => handleRemoveReminder(reminder.id)} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="date"
            value={newReminder.date}
            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newReminder.description}
            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Reminder description"
          />
          <button type="button" onClick={handleAddReminder} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;