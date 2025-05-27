const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTransactions, deposit, withdraw } = require('../controllers/customerController');

router.get('/transactions', auth, getTransactions);
router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);

module.exports = router;