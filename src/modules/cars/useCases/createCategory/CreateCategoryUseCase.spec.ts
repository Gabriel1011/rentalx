import { AppError } from "../../../../errors/appError";
import { CategoriesRepositoryFake } from "../../repositories/repositoriesFakes/CategoriesRepositoryFake";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryFake;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description Test",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category Description Test",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
