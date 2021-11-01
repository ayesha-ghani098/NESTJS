import { Body, Controller, Post } from '@nestjs/common';

// Products Service
import { ProductsService } from './products.service';

// domain.com/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
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
}
