import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";
const corsOptions = {
    origin: 'https://vite-project-two-ecru.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'], // URL de tu frontend en Vercel
  };

  



const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors(corsOptions));
server.options("*", cors(corsOptions));
server.use(router)

export default server;
