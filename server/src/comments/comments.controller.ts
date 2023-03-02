import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';


@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto,  @Request() req) {
    return this.commentsService.create(createCommentDto,  +req.user.id);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({ status: 200, type: Comment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Get comments by user id' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/userId/:id')
  findAllByUserID(@Param('id') id: string) {
    return this.commentsService.findOneByUserId(+id);
  }

  @ApiOperation({ summary: 'Get comments by product id' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/productId/:id')
  findAllByProductID(@Param('id') id: string) {
    return this.commentsService.findOneByProductId(+id);
  }


  @ApiOperation({ summary: 'Update comment by id' })
  @ApiResponse({ status: 200, type: Comment })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }


  @ApiOperation({ summary: 'Delete comment by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
