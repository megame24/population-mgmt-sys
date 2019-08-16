const { Router } = require('express');
const auth = require('./auth');
const location = require('./location');

const router = Router();
router.use('/api', auth);
router.use('/api', location);

module.exports = router;
