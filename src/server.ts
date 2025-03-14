import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";
const corsOptions = {
    origin: 'https://vite-project-rbktejxy8-carlos-aldrins-projects.vercel.app', // URL de tu frontend en Vercel
  };

const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors(corsOptions));
server.use(router)

export default server;
