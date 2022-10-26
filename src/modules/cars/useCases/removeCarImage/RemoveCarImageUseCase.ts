import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/appError";
import { deleteFile } from "../../../../utils/file";
import { ICarsImagesRepository } from "../../repositories/Interfaces/ICarsImagesRepository";

@injectable()
class RemoveCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const imageCar = await this.carsImagesRepository.find(id);

    if (!imageCar) throw new AppError("This car image doens't exists");

    await deleteFile(`./tmp/cars/${imageCar.image_name}`);

    await this.carsImagesRepository.delete(id);
  }
}
export { RemoveCarImageUseCase };
