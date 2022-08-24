import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserCase } from "./AuthenticateUserUserCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserCase = container.resolve(AuthenticateUserCase);

    const token = await authenticateUserCase.execute({
      email,
      password,
    });

    return res.status(201).json(token);
  }
}

export { AuthenticateUserController };
