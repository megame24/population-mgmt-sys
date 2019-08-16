const { Router } = require('express');
const { validateReg, validateLogin } = require('../middleware/validation/authValidator');
const { register, login } = require('../controllers/AuthController');

const router = Router();

router.post(
  '/auth/register',
  validateReg,
  register
);

router.post(
  '/auth/login',
  validateLogin,
  login
);

module.exports = router;
