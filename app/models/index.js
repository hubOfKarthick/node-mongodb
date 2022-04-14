const dbConfig = require('../config/db.config');

const mongooseConfig = require('mongoose');
mongooseConfig.Promise = global.Promise;

const db = {};
db.mongoose = mongooseConfig;
db.url = dbConfig.url;
db.schemaModel = require('./db-schema.model')(mongooseConfig);
module.export = db;