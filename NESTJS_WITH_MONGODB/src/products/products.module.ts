// Module file to merge

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // to make it injectable
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
