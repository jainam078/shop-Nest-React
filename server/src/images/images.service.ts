import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {

  constructor(
    @InjectModel(Image)
    private imageRepository: typeof Image,
    private fileService: FilesService
  ) { }

  async create(productId: number, images: any) {
    try {
      images.forEach(async image => {
        const {originalname} = image
        await this.imageRepository.create({ productId, path: originalname })
      });
    } catch (error) {
      throw new HttpException(error.errors, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    const images = await this.imageRepository.findAll()
    return images
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findByPk(id)
    if (!image) throw new HttpException('Image not found', HttpStatus.NOT_FOUND)
    return image
  }

  async update(productId: number, image: any) {
    const oldImage = await this.imageRepository.findByPk(productId)
    if (!oldImage) throw new HttpException('Image not found', HttpStatus.NOT_FOUND)
    const path = await this.fileService.createFile(image)
    const isModified = await oldImage.update({ productId, path })
    if (!isModified) throw new HttpException('Image not modified', HttpStatus.NOT_MODIFIED)
    return oldImage
  }

  async remove(id: number) {
    const isDelete = await this.imageRepository.destroy({ where: { id } })
    if (!isDelete) throw new HttpException('Image not delete', HttpStatus.NOT_FOUND)
    return isDelete
  }
}
