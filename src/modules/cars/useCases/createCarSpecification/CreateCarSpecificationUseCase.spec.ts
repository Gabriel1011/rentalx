import { AppError } from "../../../../errors/appError";
import { CarsRepositoryFake } from "../../repositories/repositoriesFakes/CarsRepositoryFake";
import { SpecificationsRepositoryFake } from "../../repositories/repositoriesFakes/SpecificationsRepositoryFake";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryFake;
let specificationsRepository: SpecificationsRepositoryFake;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake();
    specificationsRepository = new SpecificationsRepositoryFake();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationsRepository.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
