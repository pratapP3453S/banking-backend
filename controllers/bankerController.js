const User = require('../models/User');
const Account = require('../models/Account');

exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({ where: { role: 'customer' } });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Account.findAll({ where: { user_id: userId } });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.test = async (req, res) => {
  res.send("hello backend");
};
