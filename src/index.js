import express from "express";
import bodyParser from "body-parser";

import ProductController from "./controllers/product.controller";
import HomeController from "./controllers/home.controller";

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const homeController = new HomeController();
const productController = new ProductController();

app.get("/", (req, res) => homeController.welcome(req, res));
app.get("/products", (req, res) => productController.search(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
