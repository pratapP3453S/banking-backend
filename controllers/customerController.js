const Account = require('../models/Account');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Account.findAll({ where: { user_id: req.user.id } });
    const formatted = transactions.map(tx => {
      const txJson = tx.toJSON();
      return {
        ...txJson,
        created_at: txJson.created_at ? txJson.created_at.toISOString() : null
      };
    });
    console.log(transactions.map(tx => tx.created_at));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    await Account.create({ user_id: req.user.id, type: 'deposit', amount });
    res.json({ message: 'Deposit successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  try {
    const deposits = await Account.sum('amount', { where: { user_id: req.user.id, type: 'deposit' } });
    const withdrawals = await Account.sum('amount', { where: { user_id: req.user.id, type: 'withdraw' } });
    const balance = (deposits || 0) - (withdrawals || 0);

    if (amount > balance) {
      return res.status(400).json({ message: 'Insufficient Funds' });
    }

    await Account.create({ user_id: req.user.id, type: 'withdraw', amount });
    res.json({ message: 'Withdrawal successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
