import { ICategoriesReposiry } from "../../repositories/Interfaces/ICategoriesrepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private CategoriesRepository: ICategoriesReposiry) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.CategoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new Error("Category already exists");

    this.CategoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
