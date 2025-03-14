import { Request, Response } from "express";
import {
  getUserByIdService,
  getUserService,
  loginUserService,
  registerUserService,
} from "../services/userServices";
import {
  UserCredentialDTO,
  UserDTO,
  UserLoginDTO,

  UserRegisterDto,
 
} from "../dto/userDTO";
import { User } from "../entities/User.entity";
import { handleErrorResponse } from "./appointmentControllers";

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const responseService: UserDTO[] = await getUserService();
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios.",
      data: responseService,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al obtener la lista de Usuarios")
  }
};
export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const responseService: UserDTO = await getUserByIdService(parseInt(id, 10));
    res.status(200).json(responseService);
  } catch (error) {
    res.status(404).json({
      message: `No se encontro al usuario con el id: ${id}`
    })
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDto>,
  res: Response
): Promise<void> => {
  console.log(req.body);
  
  try {
    const serviceResponse: User = await registerUserService(req.body);
    res.status(201).json({
      message: "Registro de un nuevo usuario",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al registrar al usuario")
  }
};

export const loginUserController = async (
  req: Request<unknown, unknown, UserCredentialDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: UserLoginDTO = await loginUserService(req.body);
    res.status(200).json(serviceResponse);
  } catch (error) {
    handleErrorResponse(error, res, "Error en los datos introducidos en las credenciales")
  }
};
