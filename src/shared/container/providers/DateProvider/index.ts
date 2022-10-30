import { container } from "tsyringe";

import { DayjsDateProvider } from "./DayjsDateProvider";
import { IDateProvider } from "./interfaces/IDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
