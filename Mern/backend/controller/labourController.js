import Labour from '../model/Labor.js';


export const createLabour = async (req, res) => {
  console.log("API : LABOUR, CALL : createLabour")
  const { name, totalEarning, role, hourlyRate, hoursWorked } = req.body;
  try {
    const labour = new Labour({
        name,
        role,
        hourlyRate,
        hoursWorked,
        totalEarning
    });
    
    const savedLabour = await labour.save();
    res.status(201).json(savedLabour);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Labour', error: err.message });
  }
};

export const getLabours = async (req, res) => {
  console.log("API : LABOUR, CALL : getLabours")
  try {
    const labours = await Labour.find()
    res.status(200).json(labours);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch labours', error: err.message });
  }
};
