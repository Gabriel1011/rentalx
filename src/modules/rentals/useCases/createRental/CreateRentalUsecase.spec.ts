import dayjs from "dayjs";

import { AppError } from "../../../../errors/appError";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";
import { CarsRepositoryFake } from "../../../cars/repositories/repositoriesFakes/CarsRepositoryFake";
import { RentalsRepositoryFake } from "../../repositories/repositoriesFakes/RentalsRepositoryFake";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryFake: CarsRepositoryFake;
let rentalsRepositoryFake: RentalsRepositoryFake;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    rentalsRepositoryFake = new RentalsRepositoryFake();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryFake,
      new DayjsDateProvider(),
      carsRepositoryFake
    );
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryFake.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryFake.create({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "another-car",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryFake.create({
      user_id: "12345",
      car_id: "22222",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "22222",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("should not be able to create a new rental with invalid return", async () => {
    await rentalsRepositoryFake.create({
      user_id: "12345",
      car_id: "22222",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "2323",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
