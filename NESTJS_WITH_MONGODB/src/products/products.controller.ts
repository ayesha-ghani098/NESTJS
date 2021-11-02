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
  addProduct(
    // @Body() completeBody : {title: string,description: string, price: number} // Another way to represent
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  //GET ALL PRODUCTS
  @Get()
  getAllProducts() {
    return { products: this.productsService.fetchProducts() };
    // return this.productsService.fetchProducts();
  }

  @Get(':id')
  // @Param : getting data inside id parameter
  getProduct(@Param('id') prodId: string) {
    return this.productsService.fetchSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
