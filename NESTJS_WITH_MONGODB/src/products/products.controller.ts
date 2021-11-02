import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

// Products Service
import { ProductsService } from './products.service';

// domain.com/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ADD PRODUCT
  // post method to add
  @Post()
  async addProduct(
    // @Body() completeBody : {title: string,description: string, price: number} // Another way to represent
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  //GET ALL PRODUCTS
  @Get()
  async getAllProducts() {
    const products = await this.productsService.fetchProducts();
    return { products: products };
  }

  @Get(':id')
  // @Param : getting data inside id parameter
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.fetchSingleProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
