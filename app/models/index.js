const dbConfig = require('../config/db.config');

const mongooseConfig = require('mongoose');
mongooseConfig.Promise = global.Promise;

const db = {};
db.mongoose = mongooseConfig;
db.url = dbConfig.url;
db.stories = require('./db-schema.model.js')(mongooseConfig);
module.exports = db;