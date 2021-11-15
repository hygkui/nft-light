/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config({ path: '.env' });
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636986009658_3391';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'postgres',
    database: 'dbgrcu0t6tec46',
    host: 'ec2-3-212-194-162.compute-1.amazonaws.com',
    port: '5432',
    username: 'ntfrigdhysjsta',
    password: process.env.dbPassword,
    ssl: true,
    sync: {
      force: true,
      alter: true,
    },
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
