export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  imageUrl?: string;
  category?: string;
  supermarket: string;
}

export interface SupermarketService {
  searchProducts(query: string): Promise<Product[]>;
  getProductDetails(productId: string): Promise<Product | null>;
  getPriceHistory?(productId: string): Promise<PriceHistory[]>;
}

export interface PriceHistory {
  date: Date;
  price: number;
}
