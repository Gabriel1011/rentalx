import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres-rentalx",
  port: 5432,
  username: "rentalx",
  password: "rentalx123",
  database: "rentalx",
  entities: [Category, Specification, User], // [`${__dirname}/**/entities/*{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*{ts,js}`],
});
