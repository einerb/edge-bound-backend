import { Product } from "@domain/product";
import { ProductRead } from "./product-read";

export class ProductFilter {
  constructor(private readonly dataReader: ProductRead) {
    this.dataReader = dataReader;
  }

  filterProducts(param: any): Product[] {
    const data = this.dataReader.readData();

    if (!param) {
      return data.product;
    }

    const filteredProducts = data.product.filter((product: Product) =>
      product.name.toLowerCase().includes(param.toLowerCase())
    );
    return filteredProducts;
  }
}
