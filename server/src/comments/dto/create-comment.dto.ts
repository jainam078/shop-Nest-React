import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: 'good product', description: 'message' })
    @IsString({ message: 'must be string' })
    @Length(2, 16, { message: 'must be 2 - 16 symbols' })
    readonly message: string;

    @ApiProperty({ example: '42', description: 'product id' })
    @IsNumber({}, { message: 'must be number' })
    readonly productId: number;
}
