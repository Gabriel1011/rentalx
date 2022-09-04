import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/Interfaces/ICarsRepository";

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(name, brand, category_id);
  }
}

export { ListAvailableCarsUseCase };
