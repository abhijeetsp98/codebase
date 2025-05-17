
import Table from "../model/Table.js";
import Task from '../model/Task.js';

// @desc    Get table details by table_number
// @route   GET /table/:id
// @access  Private
export const getTableDetails = async (req, res) => {
    console.log("API table")
  const tableNumber = parseInt(req.params.id);

  try {
    const table = await Table.findOne({ table_number: tableNumber }).populate('orders');

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    const latestOrder = [...table.orders].reverse().find(order => !order.isClosed);

    if (!latestOrder) {
      return res.json({
        message: 'No active order. You can place a new order.',
        table_number: table.table_number,
        current_bill: table.current_bill,
        orders: [],
      });
    }

    res.json({
      message: 'Active order found.',
      table_number: table.table_number,
      current_bill: table.current_bill,
      order: latestOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTablesStatus = async (req, res) => {
try {
  const tableData = await Table.find();
  if(!tableData || tableData.length === 0){
      return res.status(404).json({message:"There is no task added in the DB."})
  }
  res.status(200).json(tableData);
  } catch(error){
  res.status(500).json({errorMessage:error.message})
  }
};

// @desc    Add a new order to the table
// @route   POST /table/:id/order
// @access  Private
export const addOrderToTable = async (req, res) => {
  const tableNumber = parseInt(req.params.id);
  const { items } = req.body;

  try {
    // Prepare items with quantity and computed amount
    const processedItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    // Calculate total, tax, and net
    const total = processedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = +(total * 0.3).toFixed(2); // 30% tax
    const netAmount = total + tax;

    // Find existing table or create a new one
    let table = await Table.findOne({ table_number: tableNumber });

    if (!table) {
      // Create new table with the current order
      table = new Table({
        table_number: tableNumber,
        orders: processedItems,
        current_bill: netAmount
      });
      await table.save();

      return res.status(201).json({
        message: 'New table created and items added',
        table_number: table.table_number,
        orders: table.orders,
        current_bill: table.current_bill,
        tax,
        netAmount
      });
    }

    // Table exists: append to current order
    table.orders.push(...processedItems);
    table.current_bill += netAmount;

    await table.save();

    res.status(200).json({
      message: 'Items added to existing table',
      table_number: table.table_number,
      orders: table.orders,
      current_bill: table.current_bill,
      tax,
      netAmount
    });
  } catch (error) {
    console.error('Error adding items to table:', error);
    res.status(500).json({ message: 'Failed to add items', error: error.message });
  }
};



// @desc    Checkout / close order for a table
// @route   POST /table/:id/checkout
// @access  Private
export const checkoutTable = async (req, res) => {
  const tableNumber = parseInt(req.params.id);

  try {
    const table = await Table.findOne({ table_number: tableNumber });
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    const activeOrder = await Order.findOne({ _id: { $in: table.orders }, isClosed: false });

    if (!activeOrder) {
      return res.status(400).json({ message: 'No active order to checkout' });
    }

    activeOrder.isClosed = true;
    await activeOrder.save();

    table.current_bill = 0;
    await table.save();

    res.json({ message: 'Order closed. Table is now available.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
