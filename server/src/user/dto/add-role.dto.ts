import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({ message: 'must be string' })
    readonly value: string;
    @IsNumber({}, { message: 'must be number' })
    readonly userId: number;
}