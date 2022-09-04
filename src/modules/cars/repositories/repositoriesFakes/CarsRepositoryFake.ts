import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../Interfaces/ICarsRepository";

class CarsRepositoryFake implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name)
      ) {
        return car;
      }
      return null;
    });
  }
}

export { CarsRepositoryFake };
