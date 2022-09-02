import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/appError";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/Interfaces/ICarsRepository";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async excute(data: ICreateCarDTO): Promise<Car> {
    const carAlradyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlradyExists) throw new AppError("Car already existis");

    return this.carsRepository.create(data);
  }
}

export { CreateCarUseCase };
