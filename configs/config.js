require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'mysql',
    logging: false,
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'mysql',
    logging: false,
  },
  staging: {
    use_env_variable: 'DATABASE_URL_STAGING',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
  },
};
