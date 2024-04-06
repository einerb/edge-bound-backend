import fs from "fs";

import { DataReader } from "@domain/product";

export class ProductRead implements DataReader {
  constructor(private readonly filePath: string) {
    this.filePath = filePath;
  }

  readData() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");

      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
}
