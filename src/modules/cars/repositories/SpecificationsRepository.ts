import { Specification } from "../model/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "./Interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private constructor() {
    this.specifications = [];
  }

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationsRepository;

  static getInstance() {
    SpecificationsRepository.INSTANCE ??= new SpecificationsRepository();

    return SpecificationsRepository.INSTANCE;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
}

export { SpecificationsRepository };
