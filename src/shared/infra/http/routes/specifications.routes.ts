import { Router } from "express";

import { CreateSpecificationConstroller } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post(
  "/",
  ensureAdmin,
  new CreateSpecificationConstroller().handle
);

export { specificationsRoutes };
