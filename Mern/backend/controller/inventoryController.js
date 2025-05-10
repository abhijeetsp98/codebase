import Inventory from '../model/Inventory.js';

export const addInventory = async (req, res) => {
  console.log("API : INVENTORY, CALL : addInventory")
  const { itemName,  itemCategory, itemQuantity, totalValue, unitPrice } = req.body;
  try {
    const inventory = new Inventory({
        itemName,  itemCategory, itemQuantity, totalValue, unitPrice
    });
    
    const savedInventory = await inventory.save();
    res.status(201).json(savedInventory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Labour', error: err.message });
  }
};

export const getInventory = async (req, res) => {
  console.log("API : INVENTORY, CALL : getInventory")
  try {
    const inventorys = await Inventory.find()
    res.status(200).json(inventorys);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch labours', error: err.message });
  }
};
