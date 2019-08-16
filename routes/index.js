const { Router } = require('express');
const auth = require('./auth');

const router = Router();
router.use('/api', auth);

module.exports = router;
