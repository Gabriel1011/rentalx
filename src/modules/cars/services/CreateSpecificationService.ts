import { inject, injectable } from "tsyringe";

import { AppError } from "../../../Error/appError";
import { ISpecificationsRepository } from "../repositories/Interfaces/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationReposity: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.specificationReposity.findByName(name);

    if (specificationAlredyExists)
      throw new AppError("Specification alredy exists", 400);

    await this.specificationReposity.create({ name, description });
  }
}

export { CreateSpecificationService };
