import { Router } from "express";

import { createSpecificationConstroller } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationConstroller.handle(req, res);
});

export { specificationsRoutes };
