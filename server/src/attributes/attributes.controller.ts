import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

@ApiTags('Attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) { }

  @ApiOperation({ summary: 'Create attribute' })
  @ApiResponse({ status: 200, type: Attribute })
  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }


  @ApiOperation({ summary: 'Get all attributes' })
  @ApiResponse({ status: 200, type: [Attribute] })
  @Get()
  findAll() {
    return this.attributesService.findAll();
  }

  @ApiOperation({ summary: 'Get attribute by id' })
  @ApiResponse({ status: 200, type: Attribute })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update attribute by id' })
  @ApiResponse({ status: 200, type: Attribute })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
    return this.attributesService.update(+id, updateAttributeDto);
  }

  @ApiOperation({ summary: 'Update attribute by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesService.remove(+id);
  }
  
  @ApiOperation({ summary: 'Add attribute to product' })
  @Patch('/addAttributeToProduct/:attributeId/:productId')
  addAttribute(@Param('attributeId') attributeId: string, @Param('productId') productId: string,) {
    return this.attributesService.addAttributeToProduct(+attributeId, +productId)
  }
}
