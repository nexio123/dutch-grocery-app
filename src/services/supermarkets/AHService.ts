import { SupermarketService, Product, PriceHistory } from '../interfaces/SupermarketService';
import axios from 'axios';

class AHService implements SupermarketService {
  private baseUrl = 'https://api.ah.nl/mobile-services/v1';

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/search?query=${encodeURIComponent(query)}`);
      
      return response.data.products.map(this.mapToProduct);
    } catch (error) {
      console.error('Error searching AH products:', error);
      throw new Error('Failed to fetch AH products');
    }
  }

  async getProductDetails(productId: string): Promise<Product | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/detail/${productId}`);
      
      return this.mapToProduct(response.data);
    } catch (error) {
      console.error('Error fetching AH product details:', error);
      return null;
    }
  }

  private mapToProduct(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      name: apiProduct.title,
      price: apiProduct.priceInfo.currentPrice,
      unit: apiProduct.priceInfo.unitSize,
      imageUrl: apiProduct.images?.length ? apiProduct.images[0].url : undefined,
      category: apiProduct.categoryName,
      supermarket: 'Albert Heijn'
    };
  }
}

export default new AHService();