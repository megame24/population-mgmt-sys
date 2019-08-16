const { Router } = require('express');
const { createLocation, updateLocation } = require('../controllers/LocationController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { validateCreate, validateUpdate } = require('../middleware/validation/locationValidator');

const router = Router();

router.post(
  '/location',
  authenticateUser,
  validateCreate,
  createLocation
);

router.put(
  '/location/:id',
  authenticateUser,
  validateUpdate,
  updateLocation
);

module.exports = router;
