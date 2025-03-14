import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments.entity";

export const AppointmentRepository = AppDataSource.getRepository(
  Appointment
).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours + 20, minutes, 0);
    const now = new Date();

    const appointmentDateBolivia = new Date(
      appointmentDate.getTime() - 4 * 60 * 60 * 1000
    );

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

  validateExistingAppointment: async function (
    userId: number,
    date: Date,
    time: string
  ): Promise<void> {
    const appointmentFound = await this.findOne({
      where: {
        user: {
          id: userId,
        },
        date: date,
        time: time,
      },
    });

    if (appointmentFound)
      throw new Error(
        `No se puede escoger una cita con la misma hora y la misma fecha`
      );
  },
});
