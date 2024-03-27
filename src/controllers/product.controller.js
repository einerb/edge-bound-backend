import { ProductService } from "../services/product.service";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async search(req, res) {
    try {
      const { search } = req.query;

      if (!search) {
        return res.status(400).json({
          success: false,
          message: "Search parameter required!",
          data: null,
        });
      }

      const filteredData = await this.productService.filterData(search);

      res.status(200).json({
        success: true,
        message: "Search results for products!",
        data: filteredData,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
