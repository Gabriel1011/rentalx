import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCateogoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCateogoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
