const { Location } = require('../../database/models');
const { throwError } = require('../../helpers/errorHelper');

/**
 * SmsValidator constructor
 * @returns {undefined}
 */
function SmsValidator() {}

/**
 * Validate sending sms
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
SmsValidator.prototype.validateCreate = async (req, res, next) => {
  let { femalePopulation, malePopulation, parentId } = req.body;
  const { user: { role } } = req;
  try {
    if (role !== 'admin') throwError('Permission denied', 403);
    if (!femalePopulation) throwError('The field femalePopulation is required', 400);
    if (isNaN(femalePopulation)) throwError('The field femalePopulation must be an integer', 400);
    if (!malePopulation) throwError('The field malePopulation is required', 400);
    if (isNaN(malePopulation)) throwError('The field malePopulation must be an integer', 400);
    if (parentId) {
      if (isNaN(parentId)) throwError('The field parentId must be an integer', 400);
      const parentLocation = await Location.findByPk(parentId);
      if (!parentLocation) throwError('Parent location not found', 400);
    }
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = new SmsValidator();
