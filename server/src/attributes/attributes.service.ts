import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute)
    private attributesRepository: typeof Attribute,
    private productService: ProductsService
  ) { }

  async create(createAttributeDto: CreateAttributeDto) {
    try {
      const attribute = await this.attributesRepository.create(createAttributeDto)
      return attribute
    } catch (error) {
      throw new HttpException(error.errors, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    return await this.attributesRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    const attribute = await this.attributesRepository.findByPk(id, { include: { all: true } })
    if (!attribute) throw new HttpException('Attribute not found', HttpStatus.NOT_FOUND)
    return attribute
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    const attribute = await this.attributesRepository.findByPk(id, { include: { all: true } })
    if (!attribute) throw new HttpException('Attribute not found', HttpStatus.NOT_FOUND)
    const isModified = await attribute.update(updateAttributeDto)
    if (!isModified) throw new HttpException('Attribute not modified', HttpStatus.NOT_MODIFIED)
    return attribute
  }

  async remove(id: number) {
    const isDelete = await this.attributesRepository.destroy({ where: { id } })
    if (!isDelete) throw new HttpException('Attribute not delete', HttpStatus.NOT_MODIFIED)
    return isDelete
  }

  async addAttributeToProduct(attributeId: number, productId: number) {
    const attribute = await this.attributesRepository.findByPk(attributeId)
    const product = await this.productService.findOne(productId)
    if (attribute && product) {
       await product.$add('attributes', attribute.id)
       await attribute.$add('products', product.id)
       return true
    }
      throw new HttpException('Attribute or product not found', HttpStatus.NOT_FOUND)
  }
}
