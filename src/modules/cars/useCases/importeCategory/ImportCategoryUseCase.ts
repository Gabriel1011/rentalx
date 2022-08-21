import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesReposiry } from "../../repositories/Interfaces/ICategoriesrepository";

interface IImporteCategory {
  name: string;
  description: string;
}

class ImporteCategoryUseCase {
  constructor(private categoryRepository: ICategoriesReposiry) {}

  loadCategories(file: Express.Multer.File): Promise<IImporteCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImporteCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => resolve(categories))
        .on("Error", (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    fs.promises.unlink(file.path);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExist = this.categoryRepository.findByName(name);

      if (!categoryAlreadyExist) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
export { ImporteCategoryUseCase };
