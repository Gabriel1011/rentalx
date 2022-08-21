import { Request, Response } from "express";

import { ImporteCategoryUseCase } from "./ImportCategoryUseCase";

class ImporteCategoryController {
  constructor(private importeCategoryUseCase: ImporteCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;

    this.importeCategoryUseCase.execute(file);

    return res.send();
  }
}

export { ImporteCategoryController };
