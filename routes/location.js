const { Router } = require('express');
const {
  createLocation, updateLocation, deleteLocation, getLocations
} = require('../controllers/LocationController');
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

router.delete(
  '/location/:id',
  authenticateUser,
  deleteLocation
);

router.get(
  '/location',
  authenticateUser,
  getLocations
);

module.exports = router;
