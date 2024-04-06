export interface Product {
  name: string;
  category: string;
}

export interface ProductData {
  product: Product[];
}

export interface DataReader {
  readData(): ProductData;
}
