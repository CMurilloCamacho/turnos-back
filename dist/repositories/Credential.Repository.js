"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialRepository = void 0;
const data_source_1 = require("../config/data-source");
const Credential_entity_1 = require("../entities/Credential.entity");
exports.CredentialRepository = data_source_1.AppDataSource.getRepository(Credential_entity_1.Credential);
