import { CarsRepositoryFake } from "../../repositories/repositoriesFakes/CarsRepositoryFake";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryFake;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFake();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Name Car 1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    // await carsRepository.create({
    //   name: "Name Car 2",
    //   description: "Description Car",
    //   daily_rate: 100,
    //   license_plate: "AAA-123",
    //   fine_amount: 60,
    //   brand: "brand",
    //   category_id: "category",
    // });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "car_teste_by_name",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car_teste_by_name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "car_teste_by_name",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "car_test_by_brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car_test_by_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "car_teste_by_name",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "AAA-123",
      fine_amount: 60,
      brand: "car_test_by_brand",
      category_id: "car_test_by_category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car_test_by_category",
    });

    expect(cars).toEqual([car]);
  });
});
