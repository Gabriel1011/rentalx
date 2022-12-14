import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../../errors/appError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "MEUSEGREDO") as IPayload;

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(user_id);

    if (!user) throw new AppError("User doesn't exists!", 401);

    req.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
