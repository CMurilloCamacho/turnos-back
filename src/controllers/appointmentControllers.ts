import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import {
  cancelStatusAppointmentService,
  getAppointmentByIdService,
  getAppointmentService,
  registerAppointmentService,
} from "../services/appointmentService";
import { Appointment } from "../entities/Appointments.entity";

export const handleErrorResponse = (
  error: unknown,
  res: Response,
  message: string
): void => {
  const errorMessage = {
    message: message,
    details: error instanceof Error ? error.message : "Error desconocido",
  };
  res.status(400).json(errorMessage);
};

export const getAppointmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse = await getAppointmentService();
    res.status(200).json({
      message: "Obtener el listado de todos los turnos de todos los usuarios.",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al obtener todas las citas");
  }
};
export const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await getAppointmentByIdService(id);
    res.status(200).json({
      message: `Detalle del turno con id: ${id}`,
      data: serviceResponse,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error al obtener usuario por Id'
    })
  }
};

export const registerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: Appointment = await registerAppointmentService(
      req.body
    );
    res.status(201).json({
      message: "Turno Agendado con éxito",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al agendar la cita");
  }
};

export const cancelStatusAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await cancelStatusAppointmentService(id);
    res.status(200).json({
      message: "Cita CANCELADA con éxito.",
      data: serviceResponse,
    });
  } catch (error) {
    res.status(404).json({
      message: `No se encontró el turno con el id ${id}`
    })
  }
};
