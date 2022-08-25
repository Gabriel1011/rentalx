import { AppError } from "../../../errors/appError";
import { ICategoriesRepository } from "../repositories/Interfaces/ICategoriesrepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists)
      throw new AppError("Category Already exists!", 400);

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
