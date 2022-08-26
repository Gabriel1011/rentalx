import { Router } from "express";
import { CreateSpecificationConstroller } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post("/", new CreateSpecificationConstroller().handle);

export { specificationsRoutes };
