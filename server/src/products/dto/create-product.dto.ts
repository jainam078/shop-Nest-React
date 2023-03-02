import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Bx231', description: 'name' })
    @IsString({ message: 'must be string' })
    @Length(4, 16, { message: 'must be 4 - 16 symbols' })
    readonly name: string;

    @ApiProperty({ example: '42', description: 'price' })
    @IsNumber({}, { message: 'must be number' })
    readonly price: number;

    @ApiProperty({ example: 'best product', description: 'description',  required: false })
    @IsOptional()
    @IsString({ message: 'must be string' })
    readonly description: string;
}
