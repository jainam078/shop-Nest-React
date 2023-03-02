import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';
import { diskStorage } from 'multer';
import { FilesService } from 'src/files/files.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { AttributesService } from 'src/attributes/attributes.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 200, type: Product })
  @UseInterceptors(FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: 'dist/static/uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  @Post()
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
    return this.productsService.create(createProductDto, images);
  }

  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }


  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 200, type: Product })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }


  @ApiOperation({ summary: 'Delete by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }


  @ApiOperation({ summary: 'Add image' })
  @UseInterceptors(FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: 'dist/static/uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  @Patch('/addImage/:id')
  addImages(@Param('id') id: string, @UploadedFiles() images) {
    return this.productsService.addImages(+id, images)
  }
}
