import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,  } from "class-validator";

export class CreateRatingDto {
    @ApiProperty({ example: 42, description: 'message' })
    @IsNumber({}, { message: 'must be number' })
    readonly value: number;

    @ApiProperty({ example: 42, description: 'product id' })
    @IsNumber({}, { message: 'must be number' })
    readonly productId: number;
}
