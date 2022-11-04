import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/entities/Rental";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres-rentalx",
  port: 5432,
  username: "rentalx",
  password: "rentalx123",
  database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  entities: [Category, Specification, User, Car, CarImage, Rental], // [`${__dirname}/**/entities/*{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*{ts,js}`],
});
