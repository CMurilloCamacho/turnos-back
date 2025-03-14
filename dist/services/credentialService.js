"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCredentials = exports.getCredentialService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Credential_entity_1 = require("../entities/Credential.entity");
const Credential_Repository_1 = require("../repositories/Credential.Repository");
const passCrypt = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPass = yield bcryptjs_1.default.hash(password, salt);
    return hashedPass;
});
const comparePassword = (password, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashedPass);
});
const checkUserExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credential_Repository_1.CredentialRepository.findOne({
        where: { username: username },
    });
    if (credentialFound)
        throw new Error(`El usuario con username ${username} ya existe`);
});
const getCredentialService = (EntityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkUserExist(username);
    const passwordEncrypted = yield passCrypt(password);
    const credentialObject = EntityManager.create(Credential_entity_1.Credential, {
        username,
        password: passwordEncrypted,
    });
    return yield EntityManager.save(credentialObject);
});
exports.getCredentialService = getCredentialService;
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield Credential_Repository_1.CredentialRepository.findOne({
        where: { username: username },
    });
    if (!credentialFound)
        throw new Error(`Usuario o contraseña incorrecto`);
    const passwordMatch = yield comparePassword(password, credentialFound.password);
    if (!passwordMatch)
        throw new Error('Usuario o contraseña incorrecto');
    if (!passwordMatch)
        throw new Error(`Usuario o contraseña incocrrecto`);
    else
        return credentialFound.id;
});
exports.checkUserCredentials = checkUserCredentials;
