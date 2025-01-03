import { Product } from './interfaces/SupermarketService';
import AHService from './supermarkets/AHService';
import JumboService from './supermarkets/JumboService';
import AldiScraper from './scrapers/AldiScraper';
import PlusScraper from './scrapers/PlusScraper';

export interface SearchResults {
  products: Product[];
  errors: {
    supermarket: string;
    error: string;
  }[];
}

class SupermarketAggregator {
  private services = {
    'Albert Heijn': AHService,
    'Jumbo': JumboService,
    'Aldi': AldiScraper,
    'Plus': PlusScraper
  };

  async searchAllSupermarkets(query: string): Promise<SearchResults> {
    const errors: { supermarket: string; error: string; }[] = [];
    const searchPromises = Object.entries(this.services).map(async ([name, service]) => {
      try {
        const products = await service.searchProducts(query);
        return products;
      } catch (error) {
        errors.push({
          supermarket: name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        return [];
      }
    });

    const results = await Promise.all(searchPromises);
    const allProducts = results.flat();

    // Sort products by price
    const sortedProducts = allProducts.sort((a, b) => a.price - b.price);

    return {
      products: sortedProducts,
      errors
    };
  }

  async findBestPrice(productName: string): Promise<Product | null> {
    const { products } = await this.searchAllSupermarkets(productName);
    if (products.length === 0) return null;

    // Find the product with the lowest price
    return products.reduce((min, product) => 
      product.price < min.price ? product : min
    );
  }

  async getProductDetails(productId: string, supermarket: string): Promise<Product | null> {
    const service = this.services[supermarket];
    if (!service) {
      throw new Error(`Unsupported supermarket: ${supermarket}`);
    }

    return service.getProductDetails(productId);
  }

  getSupportedSupermarkets(): string[] {
    return Object.keys(this.services);
  }
}

export default new SupermarketAggregator();