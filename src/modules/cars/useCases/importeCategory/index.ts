import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ImporteCategoryController } from "./ImportCategoryController";
import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryController = new ImporteCategoryController(
  new ImporteCategoryUseCase(CategoriesRepository.getInstance())
);

export { importCategoryController };
