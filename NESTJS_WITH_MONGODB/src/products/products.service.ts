import { Injectable, NotFoundException } from '@nestjs/common';

// Inject Model Decorator to inject models
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // SERVICE TO ADD PRODUCT
  async insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }
  // SERVICE TO FETCH PRODUCT
  // Returning New array of products
  async fetchProducts() {
    const products = await this.productModel.find().exec();
    // return products as Product[];
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  // SERVICE TO FETCH SINGLE PRODUCT
  // Returning single product
  async fetchSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  // SERVICE TO UPDATE PRODUCT
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  // SERVICE FOR DELETE PRODUCT
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  // SEPARATE METHODS
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
}
