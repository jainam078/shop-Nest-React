import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image) {
    return this.userService.create(createUserDto, image);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() image) {
    return this.userService.update(+id, updateUserDto, image);
  }

  @ApiOperation({ summary: 'Delete by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto) 
  }


  @ApiOperation({ summary: 'Add addresses' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Patch('/addresses')
  addAddress(@Body() addresses: [CreateAddressDto], @Request() req) {
    return this.userService.addAddresses(addresses , +req.user.id) 
  }
}
