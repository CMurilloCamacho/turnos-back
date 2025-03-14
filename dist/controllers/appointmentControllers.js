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
exports.cancelStatusAppointmentController = exports.registerAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentController = exports.handleErrorResponse = void 0;
const appointmentService_1 = require("../services/appointmentService");
const handleErrorResponse = (error, res, message) => {
    const errorMessage = {
        message: message,
        details: error instanceof Error ? error.message : "Error desconocido",
    };
    res.status(400).json(errorMessage);
};
exports.handleErrorResponse = handleErrorResponse;
const getAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, appointmentService_1.getAppointmentService)();
        res.status(200).json({
            message: "Obtener el listado de todos los turnos de todos los usuarios.",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al obtener todas las citas");
    }
});
exports.getAppointmentController = getAppointmentController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const serviceResponse = yield (0, appointmentService_1.getAppointmentByIdService)(id);
        res.status(200).json({
            message: `Detalle del turno con id: ${id}`,
            data: serviceResponse,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Error al obtener usuario por Id'
        });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const registerAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, appointmentService_1.registerAppointmentService)(req.body);
        res.status(201).json({
            message: "Turno Agendado con éxito",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al agendar la cita");
    }
});
exports.registerAppointmentController = registerAppointmentController;
const cancelStatusAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const serviceResponse = yield (0, appointmentService_1.cancelStatusAppointmentService)(id);
        res.status(200).json({
            message: "Cita CANCELADA con éxito.",
            data: serviceResponse,
        });
    }
    catch (error) {
        res.status(404).json({
            message: `No se encontró el turno con el id ${id}`
        });
    }
});
exports.cancelStatusAppointmentController = cancelStatusAppointmentController;
