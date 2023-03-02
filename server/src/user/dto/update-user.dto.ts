import { ApiProperty, PartialType } from '@nestjs/swagger';
import {  IsOptional, IsString, Length } from "class-validator";
import { Address } from 'src/addresses/entities/address.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'user@gmail.com', description: 'Unique email' , required: false  })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly email?: string;

    @ApiProperty({ example: 'dsdsfsdfsd', description: 'password' , required: false})
    @IsOptional()
    @IsString({ message: 'must be string' })
    @Length(4, 16, { message: 'must be 4 - 16 symbols' })
    readonly password?: string;

    @ApiProperty({ example: 'firstName', description: 'firstName', required: false })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly firstName?: string;

    @ApiProperty({ example: 'lastName', description: 'lastName', required: false })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly lastName?: string;

    @ApiProperty({ example: 'patronymic', description: 'patronymic', required: false })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly patronymic?: string;

    @ApiProperty({ example: 'https://www.meme-arsenal.com/memes/5c4c0337787934ae05d4c5093db3fbfa.jpg', description: 'avatar', required: false })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly avatar?: string;

    @ApiProperty({ example: 'addresses', description: 'addresses', required: false })
    @IsOptional()
    readonly addresses?: string | [Address];

}
