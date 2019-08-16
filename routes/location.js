const { Router } = require('express');
const { createLocation } = require('../controllers/LocationController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { validateCreate } = require('../middleware/validation/locationValidator');

const router = Router();

router.post(
  '/location',
  authenticateUser,
  validateCreate,
  createLocation
);

module.exports = router;
