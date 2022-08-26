import { Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async create({
    id,
    name,
    email,
    driver_license,
    password,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      driver_license,
      password,
      avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
