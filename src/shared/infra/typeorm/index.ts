import { appDataSource } from "./data-source";

appDataSource.initialize().then(() => console.log("Dabase connected"));
