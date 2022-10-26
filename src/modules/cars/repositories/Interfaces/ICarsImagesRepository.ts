import { CarImage } from "../../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  find(id: string): Promise<CarImage>;
  create(car_id: string, image_name: string): Promise<CarImage>;
  delete(iamge_id: string): Promise<void>;
}

export { ICarsImagesRepository };
