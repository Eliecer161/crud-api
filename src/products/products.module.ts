import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
