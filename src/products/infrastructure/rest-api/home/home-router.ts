import express from "express";

import { homeController } from "../../dependencies";

const homeRouter = express.Router();

homeRouter.get("/", homeController.run.bind(homeController));

export { homeRouter };
