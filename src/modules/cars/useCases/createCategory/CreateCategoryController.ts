import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCateogoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createCateogoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
