import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/createCars/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const CarsRoutes = Router();

CarsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateCarController().handle
);

CarsRoutes.get("/available", new ListAvailableCarsController().handle);

export { CarsRoutes };
