import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // SERVICE TO ADD PRODUCT
  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  // SERVICE TO FETCH PRODUCT
  // Returning New array of products
  fetchProducts() {
    return [...this.products];
  }

  // SERVICE TO FETCH SINGLE PRODUCT
  // Returning single product
  fetchSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  // SERVICE TO UPDATE PRODUCT
  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);

    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;

    //   const product = this.findProduct(productId)[0];
    //     const index = this.findProduct(productId)[1];
  }

  // SERVICE FOR DELETE PRODUCT
  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }

  // SEPARATE METHODS
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
