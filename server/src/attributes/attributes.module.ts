import { forwardRef, Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attribute } from './entities/attribute.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductAttributes } from './entities/product-attributes';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Attribute, Product, ProductAttributes]),
    ProductsModule,
  ],
  exports: [AttributesService],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule { }
