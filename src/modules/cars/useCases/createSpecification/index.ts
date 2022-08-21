import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../../services/CreateSpecificationService";
import { CreateSpecificationConstroller } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationService = new CreateSpecificationService(
  specificationsRepository
);

const createSpecificationUseCase = new CreateSpecificationUseCase(
  createSpecificationService
);

const createSpecificationConstroller = new CreateSpecificationConstroller(
  createSpecificationUseCase
);

export { createSpecificationConstroller };
