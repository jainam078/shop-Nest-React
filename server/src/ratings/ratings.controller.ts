import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Rating } from './entities/rating.entity';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @ApiOperation({ summary: 'Create rating' })
  @ApiResponse({ status: 200, type: Rating })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto,  @Request() req) {
    return this.ratingsService.create(createRatingDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({ status: 200, type: [Rating] })
  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @ApiOperation({ summary: 'Get rating by id' })
  @ApiResponse({ status: 200, type: [Rating] })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ratingsService.findById(+id);
  }

  @ApiOperation({ summary: 'Get average rating by product id' })
  @ApiResponse({ status: 200, type: Number })
  @Get('/product/:id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.getProductRaiting(+id);
  }
}
