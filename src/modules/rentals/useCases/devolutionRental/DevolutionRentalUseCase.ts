import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/appError";
import { ICarsRepository } from "@modules/cars/repositories/Interfaces/ICarsRepository";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/interfaces/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/interfaces/IDateProvider";

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental doesn't exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    // Verificar o tempo de aluguel
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
