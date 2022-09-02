import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/createCars/CreateCarController";

const CarsRoutes = Router();

CarsRoutes.post("/", new CreateCarController().handle);

export { CarsRoutes };
