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
exports.cancelStatusAppointmentService = exports.registerAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const AppointmentInterfaces_1 = require("../interfaces/AppointmentInterfaces");
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const userServices_1 = require("./userServices");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Appointment_Repository_1.AppointmentRepository.find();
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10),
        },
    });
    if (!appointmentFound)
        throw new Error(`La cita con id: ${id} no fue encontrada`);
    else
        return appointmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userServices_1.getUserByIdService)(appointmentData.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);
    yield Appointment_Repository_1.AppointmentRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
    const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: {
            id: appointmentData.userId,
        },
    });
    return Appointment_Repository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const cancelStatusAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    });
    if (!appointmentFound)
        throw new Error(`La cita con id: ${id} no fue encontrada`);
    appointmentFound.status = AppointmentInterfaces_1.Status.cancelled;
    yield Appointment_Repository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelStatusAppointmentService = cancelStatusAppointmentService;
