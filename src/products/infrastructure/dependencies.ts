import path from "path";

import { HomeController } from "./rest-api/home/home-controller";
import { ProductController } from "./rest-api/product/product-controller";
import { ProductFilter } from "@application/product-filter";
import { ProductRead } from "@application/product-read";
import { ProductSuggester } from "@application/product-suggester";

const pathJson = path.join(__dirname, "./rest-api/product/product.json");
const dataReader = new ProductRead(pathJson);
const productFilter = new ProductFilter(dataReader);
const productSuggester = new ProductSuggester(dataReader);

export const homeController = new HomeController();
export const productController = new ProductController(
  productFilter,
  productSuggester
);
