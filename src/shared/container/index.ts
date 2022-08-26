import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUserRepository } from "../../modules/accounts/repositories/interfaces/IUserRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/Interfaces/ICategoriesrepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/Interfaces/ISpecificationsRepository";
import { CreateSpecificationService } from "../../modules/cars/services/CreateSpecificationService";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<CreateSpecificationService>(
  "CreateSpecificationService",
  CreateSpecificationService
);

container.registerSingleton<IUserRepository>("UserRepository", UsersRepository);
