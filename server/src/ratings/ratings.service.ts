import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating) private ratingRepository: typeof Rating,
    private productService: ProductsService
  ) { }

  async create(createRatingDto: CreateRatingDto, userId: number) {
    const candidates = await this.ratingRepository.findAll({ where: { productId: +createRatingDto.productId, userId } })
    if (candidates.length) {
      throw new HttpException('Already rated', HttpStatus.NOT_ACCEPTABLE)
    }
    const product = await this.productService.findOne(+createRatingDto.productId)
    if (product) {
      return await this.ratingRepository.create({ ...createRatingDto, userId })
    }
    throw new HttpException('User or product not found', HttpStatus.NOT_FOUND)
  }

  async findAll() {
    return await this.ratingRepository.findAll()
  }

  async findById(id: number) {
    const rating = await this.ratingRepository.findByPk(id)
    if (!rating) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    return rating
  }

  async getProductRaiting(id: number) {
    const ratings: Rating[] = await this.ratingRepository.findAll({ where: { productId: id } })
    if (!ratings.length) throw new HttpException('Rating not found', HttpStatus.NOT_FOUND)

  const avgReting = ratings.reduce((acc,rating ) => {
    return acc + +rating.value
  },0) / ratings.length
  
    return avgReting
  }
}
