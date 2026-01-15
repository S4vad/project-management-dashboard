import { useState } from "react";

const TaskForm = ({ onSave, onCancel, assignees }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
    status: 'Todo'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', description: '', assignedTo: '', status: 'Todo' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Task name"
          required
        />
        <select
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Assign to...</option>
          {assignees.map((assignee) => (
            <option key={assignee} value={assignee}>{assignee}</option>
          ))}
        </select>
      </div>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        rows="2"
        placeholder="Task description"
      />
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 