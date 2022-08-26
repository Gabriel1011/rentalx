import { Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { Specification } from "../../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/Interfaces/ISpecificationsRepository";


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
