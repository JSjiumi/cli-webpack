const { NODE_ENV } = process.env;
const isEnvDevelopment = NODE_ENV === 'development';
const isEnvProduction = NODE_ENV === 'production';

module.exports = {
  isEnvDevelopment,
  isEnvProduction,
}
