import { ApiProperty } from "@nestjs/swagger";
import {  IsString , Length} from "class-validator";

export class CreateAttributeDto {
    @ApiProperty({ example: 'color', description: 'attribute name' })
    @IsString({ message: 'must be string' })
    @Length(2, 16, { message: 'must be 2 - 16 symbols' })
    readonly name: string;

    @ApiProperty({ example: 'black', description: 'attribute value' })
    @IsString({ message: 'must be string' })
    @Length(2, 16, { message: 'must be 2 - 16 symbols' })
    readonly value: string;
}
