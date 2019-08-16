const { Location } = require('../database/models');

/**
 * LocationController constructor
 * @returns {undefined}
 */
function LocationController() { }

/**
 * Create location controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
LocationController.createLocation = async (req, res, next) => {
  let { femalePopulation, malePopulation, parentId } = req.body;
  try {
    const location = await Location
      .create({ femalePopulation, malePopulation, parentId }, { returning: true });
    res.status(201).json({ location });
  } catch (err) {
    next(err);
  }
};

module.exports = LocationController;
