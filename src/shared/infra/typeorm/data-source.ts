import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres-rentalx",
  port: 5432,
  username: "rentalx",
  password: "rentalx123",
  database: "rentalx",
  entities: [Category, Specification, User, Car], // [`${__dirname}/**/entities/*{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*{ts,js}`],
});
