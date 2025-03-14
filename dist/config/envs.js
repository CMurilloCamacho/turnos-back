"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DROP = exports.DB_ENTITIES = exports.DB_LOGGING = exports.DB_SYNC = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.DB_TYPE = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
exports.DB_TYPE = process.env.DB_TYPE ? process.env.DB_TYPE : "postgres";
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.DB_SYNC = process.env.DB_SYNC ? process.env.DB_SYNC === "true" : true;
exports.DB_LOGGING = process.env.DB_LOGGING ? process.env.DB_LOGGING == "true" : true;
exports.DB_ENTITIES = process.env.DB_ENTITIES;
exports.DB_DROP = process.env.DB_DROP ? process.env.DB_DROP === "true" : true;
// DB_DATABASE =turnos
// DB_SYNC =true
// DB_LOGGING =["ERROR"]["src/entities/**/*.ts"
// DB_ENTITIES =[]
// DB_DROP =true
