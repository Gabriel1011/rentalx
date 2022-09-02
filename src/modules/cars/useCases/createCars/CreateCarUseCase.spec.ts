import { AppError } from "../../../../errors/appError";
import { CarsRepositoryFake } from "../../repositories/repositoriesFakes/CarsRepositoryFake";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryFake;

describe("Create a new car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("shoult be able to create a new car", async () => {
    const car = await createCarUseCase.excute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.excute({
        name: "Name Car 1",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "AAA-123",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      });

      await createCarUseCase.excute({
        name: "Name Car 2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "AAA-123",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoult be able to create a car with available ture by default", async () => {
    const car = await createCarUseCase.excute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
