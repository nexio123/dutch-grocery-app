import { SupermarketService, Product } from '../interfaces/SupermarketService';
import axios from 'axios';

class JumboService implements SupermarketService {
  private baseUrl = 'https://mobileapi.jumbo.com/v17';

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'User-Agent': 'Jumbo/9.9.9 (iPhone; iOS 15.0; Scale/3.00)'
        }
      });

      return response.data.products.data.map(this.mapToProduct);
    } catch (error) {
      console.error('Error searching Jumbo products:', error);
      throw new Error('Failed to fetch Jumbo products');
    }
  }

  async getProductDetails(productId: string): Promise<Product | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`, {
        headers: {
          'User-Agent': 'Jumbo/9.9.9 (iPhone; iOS 15.0; Scale/3.00)'
        }
      });

      return this.mapToProduct(response.data);
    } catch (error) {
      console.error('Error fetching Jumbo product details:', error);
      return null;
    }
  }

  private mapToProduct(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      name: apiProduct.title,
      price: apiProduct.prices.price.amount / 100, // Convert cents to euros
      unit: apiProduct.unitSize || apiProduct.quantity,
      imageUrl: apiProduct.image?.url,
      category: apiProduct.category?.name,
      supermarket: 'Jumbo'
    };
  }
}

export default new JumboService();