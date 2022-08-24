import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../Error/appError";
import { UsersRepository } from "../modules/accounts/repositories/UsersRepository";

interface IPayload {
  user_id: string;
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
    const decoded = verify(token, "MEUSEGREDO") as IPayload;

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(decoded.user_id);

    if (!user) throw new AppError("User doesn't exists!", 401);

    req.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
