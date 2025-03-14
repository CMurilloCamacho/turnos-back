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
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointments_entity_1 = require("../entities/Appointments.entity");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointments_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours + 20, minutes, 0);
        const now = new Date();
        const appointmentDateBolivia = new Date(appointmentDate.getTime() - 4 * 60 * 60 * 1000);
        const nowInBolivia = new Date(now.getTime() - 4 * 60 * 60 * 1000);
        const dateOnWeek = appointmentDateBolivia.getUTCDay();
        if (dateOnWeek === 6 || dateOnWeek === 0)
            throw new Error(`No se puede agendar citas los fines de semana`);
        const diffMiliSecond = appointmentDate.getTime() - nowInBolivia.getTime();
        const diffHours = diffMiliSecond / (1000 * 60 * 60);
        if (appointmentDateBolivia < nowInBolivia)
            throw new Error(`No se pueden agendar fechas para citas pasadas`);
        if (diffHours < 24)
            throw new Error(`Las citas deben agendarse con 24 horas de anticipación`);
        if (hours < 7 || hours > 15)
            throw new Error(`Las citas deben realizarce entre las 8am y 16pm`);
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFound = yield this.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    date: date,
                    time: time,
                },
            });
            if (appointmentFound)
                throw new Error(`No se puede escoger una cita con la misma hora y la misma fecha`);
        });
    },
});
