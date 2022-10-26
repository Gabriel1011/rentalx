import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveCarImageUseCase } from "./RemoveCarImageUseCase";

class RemoveCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const removeCarsImageUseCase = container.resolve(RemoveCarImageUseCase);

    removeCarsImageUseCase.execute(id);

    return res.status(200).send();
  }
}

export { RemoveCarImageController };
