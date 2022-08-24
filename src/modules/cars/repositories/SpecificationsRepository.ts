import { Repository } from "typeorm";

import { appDataSource } from "../../../database/data-source";
import { Specification } from "../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "./Interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }

  // eslint-disable-next-line no-use-before-define

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    this.repository.save(specification);
  }
}

export { SpecificationsRepository };
