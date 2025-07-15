
import Table from "../model/Table.js";

export const getTableData = async (req, res) => {
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

export const setTableData = async (req, res) => {
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



