import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty({ example: 'https://www.meme-arsenal.com/memes/5c4c0337787934ae05d4c5093db3fbfa.jpg', description: 'path to image'})
    @IsString({ message: 'must be string' })
    readonly path: string;

    @ApiProperty({ example: 1, description: 'product id'})
    @IsNumber()
    readonly productId: number;
}
