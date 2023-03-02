import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';


class AuthResponse  {
  token: string
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: AuthResponse })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: 200, type: AuthResponse })
    @UseInterceptors(FileInterceptor('image'))
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @UploadedFile() image) {
        return this.authService.registration(userDto, image)
    }
}