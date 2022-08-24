import { container } from "tsyringe";

import { IUserRepository } from "../../modules/accounts/repositories/interfaces/IUserRepository";
import { UsersRepository } from "../../modules/accounts/repositories/UsersRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/Interfaces/ICategoriesrepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/Interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/SpecificationsRepository";
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
