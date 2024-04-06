import express from "express";

import { productController } from "../../dependencies";

const productRouter = express.Router();

productRouter.get("/", productController.run.bind(productController));

export { productRouter };