import { DataSource, Repository } from "typeorm";
import {
  DB_DATABASE,
  DB_DROP,
  DB_ENTITIES,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_TYPE,
  DB_USERNAME,
} from "./envs";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { Appointment } from "../entities/Appointments.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: process.env.DB_SSL === "true"? { rejectUnauthorized: false } : false,
  synchronize: DB_SYNC,
  logging: DB_LOGGING,
  entities:[User, Credential, Appointment],
  dropSchema: DB_DROP,
});




