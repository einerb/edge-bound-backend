import { Product } from "@domain/product";
import { ProductRead } from "./product-read";

export class ProductSuggester {
  constructor(private readonly dataReader: ProductRead) {
    this.dataReader = dataReader;
  }

  findSuggestedProducts(filteredProducts: Product[]): Product[] {
    const category = filteredProducts[0]?.category;
    if (!category) {
      return [];
    }

    const data = this.dataReader.readData();
    const suggestedProducts = data.product.filter(
      (product: Product) =>
        product.category === category &&
        !filteredProducts.some((filteredProduct) =>
          Object.is(filteredProduct, product)
        )
    );

    const foundProductNames = filteredProducts.map((product) => product.name);
    const uniqueSuggestedProducts = suggestedProducts.filter(
      (product: Product) => !foundProductNames.includes(product.name)
    );

    return uniqueSuggestedProducts.slice(0, 2);
  }
}
