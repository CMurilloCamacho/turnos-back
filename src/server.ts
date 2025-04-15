import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";
const corsOptions = {
    origin: 'https://vite-project-two-ecru.vercel.app/', // URL de tu frontend en Vercel
  };

  

  //https://vite-project-gncwez6vy-carlos-aldrins-projects.vercel.app/

const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors(corsOptions));
server.use(router)

export default server;
