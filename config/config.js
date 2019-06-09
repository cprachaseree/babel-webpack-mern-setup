/* @param config            {Object}  server-side configuration variables
 * @param config.env        {String}  differential between production and production
 * @param config.port       {Number}  define listening port for server
 * @param config.jwtSecret  {String}  secret key to used sign JWT
 * @param config.mongoUri   {String}  location of MongoDB database
 */

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || 
    process.env.MONGO_HOST || 
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject',
  };

export default config;