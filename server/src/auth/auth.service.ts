import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/entities/user.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService,
        private fileService: FilesService
    ) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto, image?: any) {
        const candidate = await this.userService.findOneByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('There is already a user with this email', HttpStatus.BAD_REQUEST)
        }
        const fileName = await this.fileService.createFile(image)
        const user = await this.userService.create({ ...userDto, avatar: fileName })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.findOneByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'not correct email or password' })
    }
}
