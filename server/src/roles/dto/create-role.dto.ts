import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'Admin', description: 'Your role', default: 'User' })
    @IsString({ message: 'must be string' })
    readonly value: string;

    @ApiProperty({ example: 'Very important role', description: 'Description of your role', required: false})
    @IsString({ message: 'must be string' })
    readonly description: string;
}
