import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";


export class CreateAddressDto {
    @ApiProperty({ example: 'Ukraine', description: 'country', default: 'Ukraine', required: false })
    @IsString({ message: 'must be string' })
    @Length(4, 16, { message: 'must be 4 - 16 symbols' })
    readonly country: string;

    @ApiProperty({ example: 'Shevchenko', description: 'street' })
    @IsString({ message: 'must be string' })
    @Length(4, 16, { message: 'must be 4 - 16 symbols' })
    readonly street: string;

    @ApiProperty({ example: '42a', description: 'house number' })
    @IsString({ message: 'must be string' })
    readonly houseNumber: string;

    @ApiProperty({ example: '42', description: 'room number', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'must be number' })
    readonly roomNumber?: number;

    @ApiProperty({ example: '42', description: 'postal code' })
    @IsNumber({}, { message: 'must be number' })
    readonly postalCode: number;

    @ApiProperty({ example: '42-42-42', description: 'phone number' })
    @IsString({ message: 'must be string' })
    readonly phoneNumber: string;

    @ApiProperty({ example: '42', description: 'userId' })
    @IsNumber({}, { message: 'must be number' })
    readonly userId: number;
}
