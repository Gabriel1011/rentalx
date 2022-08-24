import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importeCategoryUseCase = container.resolve(ImporteCategoryUseCase);

    await importeCategoryUseCase.execute(file);

    return res.status(201).send();
  }
}

export { ImportCategoryController };
