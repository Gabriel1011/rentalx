import { appDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/appError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryFake } from "../../repositories/repositoriesFakes/UsersRepositoryFake";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryFake;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryFake();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123123",
      name: "User Test",
      email: "user@teste.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute(user);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "",
        password: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authentucate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123123",
        name: "User Test",
        email: "user@teste.com",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "user@teste.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(appDataSource);
  });

  it("should not be able to authentucate with incorrect email", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123123",
        name: "User Test",
        email: "user@teste.com",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(appDataSource);
  });
});
