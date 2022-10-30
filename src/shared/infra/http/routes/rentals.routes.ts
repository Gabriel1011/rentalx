import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  new CreateRentalController().handle
);

export { rentalRoutes };
