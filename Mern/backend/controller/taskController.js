import Task from '../model/Task.js';

export const createTask = async (req, res) => {
  console.log("API : TASK, CALL : createTask")
  const { dishId, assignedTo, notes, scheduledAt, priority } = req.body;
  try {
    const task = new Task({
      dishId,
      assignedTo,
      assignedBy: req.user._id,
      notes,
      scheduledAt,
      priority,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

export const getTasks = async (req, res) => {
  console.log("API : TASK, CALL : getTasks")
  try {
    const tasks = await Task.find()
      .populate('dishId', 'name')
      .populate('assignedTo', 'name')
      .populate('assignedBy', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};
