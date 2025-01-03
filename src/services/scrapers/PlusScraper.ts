import { SupermarketService, Product } from '../interfaces/SupermarketService';
import axios from 'axios';
import * as cheerio from 'cheerio';

class PlusScraper implements SupermarketService {
  private baseUrl: string = 'https://www.plus.nl';

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/zoeken?q=${encodeURIComponent(query)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
        }
      });
      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('.product-card').each((_, element) => {
        const product = this.extractProductData($, element);
        if (product) products.push(product);
      });

      return products;
    } catch (error) {
      console.error('Error scraping Plus products:', error);
      throw new Error('Failed to fetch Plus products');
    }
  }

  async getProductDetails(productId: string): Promise<Product | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/product/${productId}`);
      const $ = cheerio.load(response.data);
      
      const productDetail = $('.product-detail');
      if (!productDetail.length) return null;

      return this.extractProductData($, productDetail);
    } catch (error) {
      console.error('Error fetching Plus product details:', error);
      return null;
    }
  }

  private extractProductData($: cheerio.Root, element: cheerio.Element): Product | null {
    const id = $(element).attr('data-product-id');
    const name = $(element).find('.product-name').text().trim();
    const priceText = $(element).find('.product-price').text().trim();
    const price = this.extractPrice(priceText);

    if (!id || !name || !price) return null;

    return {
      id,
      name,
      price,
      unit: $(element).find('.product-unit').text().trim(),
      imageUrl: $(element).find('.product-image img').attr('src'),
      category: $(element).find('.product-category').text().trim(),
      supermarket: 'Plus'
    };
  }

  private extractPrice(priceString: string): number {
    const price = priceString.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(price) || 0;
  }
}

export default new PlusScraper();