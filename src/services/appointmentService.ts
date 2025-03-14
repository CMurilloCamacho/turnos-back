import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { Appointment } from "../entities/Appointments.entity";
import { Status } from "../interfaces/AppointmentInterfaces";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { getUserByIdService } from "./userServices";

export const getAppointmentService = async (): Promise<Appointment[]> => {
  return await AppointmentRepository.find();
};
export const getAppointmentByIdService = async (
  id: string
): Promise<Appointment | null> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!appointmentFound)
    throw new Error(`La cita con id: ${id} no fue encontrada`);
  else return appointmentFound;
};

export const registerAppointmentService = async (
  appointmentData: AppointmentRegisterDTO
): Promise<Appointment> => {
  await getUserByIdService(appointmentData.userId);

  AppointmentRepository.validateAllowAppointment(
    appointmentData.date,
    appointmentData.time
  );
  await AppointmentRepository.validateExistingAppointment(
    appointmentData.userId,
    appointmentData.date,
    appointmentData.time
  );

  const newAppointment = AppointmentRepository.create({
    date: appointmentData.date,
    time: appointmentData.time,
    user: {
      id: appointmentData.userId,
    },
  });

  return AppointmentRepository.save(newAppointment);
};

export const cancelStatusAppointmentService = async (
  id: string
): Promise<void> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10)
    }
  });
  if (!appointmentFound)
    throw new Error(`La cita con id: ${id} no fue encontrada`);

  appointmentFound.status = Status.cancelled;
  await AppointmentRepository.save(appointmentFound)
};
