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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const User_Repository_1 = require("../repositories/User.Repository");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_Repository_1.UserRepository.find({
        relations: ["credentials"],
    });
    return users;
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!userFound)
        throw new Error(`el ID ${id} No existe`);
    else
        return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const userCredentials = yield (0, credentialService_1.getCredentialService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            email: user.email,
            birthdate: new Date(user.birthdate),
            nDni: user.nDni,
            credentials: userCredentials,
        });
        return yield entityManager.save(newUser);
    }));
    return result;
});
exports.registerUserService = registerUserService;
// const idCredentialUser: Credential = await getCredentialService(
//   user.username,
//   user.password
// );
const loginUserService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialService_1.checkUserCredentials)(userCredentials.username, userCredentials.password);
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });
    console.log(userFound);
    return {
        login: true,
        user: Object.assign({}, userFound),
    };
});
exports.loginUserService = loginUserService;
