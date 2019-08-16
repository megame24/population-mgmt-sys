const crypto = require('crypto');
const { User } = require('../database/models');
const tokenService = require('../services/tokenService');
const { throwError } = require('../helpers/errorHelper');

/**
 * AuthController constructor
 * @returns {undefined}
 */
function AuthController() { }

/**
 * Registration controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
AuthController.register = async (req, res, next) => {
  let { name, email, password } = req.body;
  const hash = crypto.createHash('sha256');
  hash.update(password);
  password = hash.digest('hex');
  try {
    const user = await User
      .create({ name, email, password }, { returning: true });
    delete user.dataValues.password;
    const tokenPayload = {
      id: user.id
    };
    const token = tokenService.generateToken(tokenPayload);
    res.status(201).json({
      user,
      token,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
AuthController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) throwError('Email or Password is invalid', 401);
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    if (hashedPassword !== user.password) {
      throwError('Email or Password is invalid', 401);
    }
    delete user.dataValues.password;
    const tokenPayload = {
      id: user.id
    };
    const token = tokenService.generateToken(tokenPayload);
    res.status(201).json({
      user,
      token,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
  } catch (err) {
    next(err);
  }
};

module.exports = AuthController;
