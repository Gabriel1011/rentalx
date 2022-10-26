import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCars/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { RemoveCarImageController } from "../../../../modules/cars/useCases/removeCarImage/RemoveCarImageController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.get("/available", new ListAvailableCarsController().handle);

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarController().handle
);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarSpecificationController().handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  new UploadCarImagesController().handle
);

carsRoutes.delete(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  new RemoveCarImageController().handle
);

export { carsRoutes };
