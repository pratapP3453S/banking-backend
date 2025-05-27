const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCustomers, getCustomerTransactions, test } = require('../controllers/bankerController');

router.get('/customers', auth, getCustomers);
router.get('/transactions/:userId', auth, getCustomerTransactions);
router.get('/h', test)

module.exports = router;