import { request, Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, brand, category_id } = req.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCarUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return res.json(cars).send();
  }
}

export { ListAvailableCarsController };
