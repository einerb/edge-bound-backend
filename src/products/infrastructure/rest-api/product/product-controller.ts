import { Request, Response } from "express";

import { ProductFilter } from "@application/product-filter";
import { ProductSuggester } from "@application/product-suggester";

export class ProductController {
  constructor(
    private readonly productFilter: ProductFilter,
    private readonly productSuggester: ProductSuggester
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { search } = req.query;

      if (!search) {
        return res.status(400).json({
          success: false,
          message: "Search parameter required!",
          data: null,
        });
      }

      const filteredProducts = this.productFilter.filterProducts(search);
      const suggestedProducts =
        this.productSuggester.findSuggestedProducts(filteredProducts);

      res.status(200).json({
        success: true,
        message: "Search results for products!",
        data: { foundProducts: filteredProducts, suggestedProducts },
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
