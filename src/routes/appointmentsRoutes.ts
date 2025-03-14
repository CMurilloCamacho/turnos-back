import { request, Request, Response, Router } from "express";
import router from ".";
import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { cancelStatusAppointmentController, getAppointmentByIdController, getAppointmentController, registerAppointmentController } from "../controllers/appointmentControllers";
const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req:Request, res: Response)=> getAppointmentController(req,res))
appointmentRouter.get("/:id", (req:Request<{id: string}>, res: Response)=> getAppointmentByIdController (req,res))
appointmentRouter.post("/shedule", (req:Request<unknown, unknown, AppointmentRegisterDTO>, res: Response)=> registerAppointmentController (req,res))
appointmentRouter.put('/cancel/:id',(req:Request<{id: string}>, res: Response)=> cancelStatusAppointmentController(req,res) )


export default appointmentRouter;


