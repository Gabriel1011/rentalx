import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/appError";
import { ICategoriesRepository } from "../../repositories/Interfaces/ICategoriesrepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private CategoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.CategoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists)
      throw new AppError("Category already exists", 400);

    this.CategoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
