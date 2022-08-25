import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../Error/appError";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IRespose {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IRespose> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Email or password incorrect!", 400);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect!", 400);

    const token = sign({ email }, "MEUSEGREDO", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
