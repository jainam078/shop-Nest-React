import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private productService: ProductsService
  ) { }

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const product = await this.productService.findOne(+createCommentDto.productId)
    if( product){
      return await this.commentRepository.create({...createCommentDto, userId})
    }
    throw new HttpException('User or product not found', HttpStatus.NOT_FOUND)
  }

  async findAll() {
    return await this.commentRepository.findAll()
  }

  async findOneById(id: number) {
    const comment = await this.commentRepository.findByPk(id)
    if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    return comment
  }

  async findOneByUserId(id: number) {
    const comment = await this.commentRepository.findAll({ where: { userId: id } })
    if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    return comment
  }

  async findOneByProductId(id: number) {
    const comment = await this.commentRepository.findAll({ where: { productId: id } })
    if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    return comment
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findByPk(id, { include: { all: true } })
    if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    const isModified = await comment.update(updateCommentDto)
    if (!isModified) throw new HttpException('Comment not modified', HttpStatus.NOT_MODIFIED)
    return comment
  }

  async remove(id: number) {
    const isDelete = await this.commentRepository.destroy({ where: { id } })
    if (!isDelete) throw new HttpException('Comment not delete', HttpStatus.NOT_MODIFIED)
    return isDelete
  }
}
