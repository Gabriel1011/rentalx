import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserCase.execute({
      email,
      password,
    });

    return res.status(201).json(token);
  }
}

export { AuthenticateUserController };
