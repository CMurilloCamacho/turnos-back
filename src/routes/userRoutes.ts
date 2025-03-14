import { Request, Response, Router } from "express";
const userRouter: Router = Router();
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/userControllers";
import { UserCredentialDTO,  UserRegisterDto } from "../dto/userDTO";

userRouter.get("/", (req: Request, res: Response)=> getUsersController (req, res));
userRouter.get('/:id', (req: Request<{id:string}>, res: Response)=> getUserByIdController (req, res));
userRouter.post("/register", (req: Request<unknown, unknown, UserRegisterDto>, res: Response)=>registerUserController(req, res) )
userRouter.post("/login",(req: Request<unknown, unknown, UserCredentialDTO>, res: Response)=> loginUserController (req,res))

export default userRouter;

