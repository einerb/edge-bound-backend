import fs from "fs";
import path from "path";

export class ProductService {
  constructor() {
    this.data = this.readData();
  }

  readData() {
    const pathJson = path.join(__dirname, "../data/product.json");

    try {
      const data = fs.readFileSync(pathJson, "utf8");

      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }

  findSuggestedProducts(filteredProducts) {
    const category = filteredProducts[0]?.category;
    if (!category) {
      return [];
    }

    const suggestedProducts = this.data.product.filter(
      (product) =>
        product.category === category && !filteredProducts.includes(product)
    );

    return suggestedProducts.slice(0, 2);
  }

  async filterData(param) {
    try {
      if (!this.data) {
        return [];
      }

      if (!param) {
        return this.data.product;
      }

      const filteredProducts = this.data.product.filter((product) =>
        product.name.toLowerCase().includes(param.toLowerCase())
      );

      const suggestedProducts = this.findSuggestedProducts(filteredProducts);

      return { foundProducts: filteredProducts, suggestedProducts };
    } catch (err) {
      throw err;
    }
  }
}
