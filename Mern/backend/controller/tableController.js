
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

// @desc    Add a new order to the table
// @route   POST /table/:id/order
// @access  Private
export const addOrderToTable = async (req, res) => {
  const tableNumber = parseInt(req.params.id);
  const { items } = req.body; // [{ name: 'Dish', price: 10 }, ...]

  try {
    const table = await Table.findOne({ table_number: tableNumber });
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if active order exists
    const activeOrder = await Order.findOne({ _id: { $in: table.orders }, isClosed: false });

    if (activeOrder) {
      // Append items to the existing order
      activeOrder.items.push(...items);
      activeOrder.total_amount += items.reduce((sum, item) => sum + item.price, 0);
      await activeOrder.save();

      table.current_bill += items.reduce((sum, item) => sum + item.price, 0);
      await table.save();

      return res.json({ message: 'Order updated', order: activeOrder });
    }

    // Create new order
    const newOrder = new Order({
      items,
      total_amount: items.reduce((sum, item) => sum + item.price, 0),
      isClosed: false,
    });

    await newOrder.save();
    table.orders.push(newOrder._id);
    table.current_bill = newOrder.total_amount;
    await table.save();

    res.status(201).json({ message: 'New order created', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
