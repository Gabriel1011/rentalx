import { In, Repository } from "typeorm";

import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/Interfaces/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

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

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) });
    return specifications;
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    this.repository.save(specification);

    return specification;
  }
}

export { SpecificationsRepository };
