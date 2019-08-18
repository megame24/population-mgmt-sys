const { Router } = require('express');
const {
  createLocation, updateLocation, deleteLocation, getLocations
} = require('../controllers/LocationController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { validateCreate, validateUpdate } = require('../middleware/validation/locationValidator');

const router = Router();

router.post(
  '/locations',
  authenticateUser,
  validateCreate,
  createLocation
);

router.put(
  '/locations/:id',
  authenticateUser,
  validateUpdate,
  updateLocation
);

router.delete(
  '/locations/:id',
  authenticateUser,
  deleteLocation
);

router.get(
  '/locations',
  authenticateUser,
  getLocations
);

module.exports = router;
