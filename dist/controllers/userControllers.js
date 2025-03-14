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
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const userServices_1 = require("../services/userServices");
const appointmentControllers_1 = require("./appointmentControllers");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseService = yield (0, userServices_1.getUserService)();
        res.status(200).json({
            message: "Obtener el listado de todos los usuarios.",
            data: responseService,
        });
    }
    catch (error) {
        (0, appointmentControllers_1.handleErrorResponse)(error, res, "Error al obtener la lista de Usuarios");
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const responseService = yield (0, userServices_1.getUserByIdService)(parseInt(id, 10));
        res.status(200).json(responseService);
    }
    catch (error) {
        res.status(404).json({
            message: `No se encontro al usuario con el id: ${id}`
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const serviceResponse = yield (0, userServices_1.registerUserService)(req.body);
        res.status(201).json({
            message: "Registro de un nuevo usuario",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, appointmentControllers_1.handleErrorResponse)(error, res, "Error al registrar al usuario");
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, userServices_1.loginUserService)(req.body);
        res.status(200).json(serviceResponse);
    }
    catch (error) {
        (0, appointmentControllers_1.handleErrorResponse)(error, res, "Error en los datos introducidos en las credenciales");
    }
});
exports.loginUserController = loginUserController;
