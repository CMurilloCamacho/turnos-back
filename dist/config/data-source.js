"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const Credential_entity_1 = require("../entities/Credential.entity");
const User_entity_1 = require("../entities/User.entity");
const Appointments_entity_1 = require("../entities/Appointments.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    synchronize: envs_1.DB_SYNC,
    logging: envs_1.DB_LOGGING,
    entities: [User_entity_1.User, Credential_entity_1.Credential, Appointments_entity_1.Appointment],
    dropSchema: envs_1.DB_DROP,
});
