import { ISpecificationsRepository } from "../repositories/Interfaces/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationReposity: ISpecificationsRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlredyExists =
      this.specificationReposity.findByName(name);

    if (specificationAlredyExists)
      throw new Error("Specification alredy exists ");

    this.specificationReposity.create({ name, description });
  }
}

export { CreateSpecificationService };
