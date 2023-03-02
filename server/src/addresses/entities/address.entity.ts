import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, BelongsToMany, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from 'src/user/entities/user.entity';

interface AddressCreationAttr {
    country: string;
    city: string;
    street: string;
    houseNumber: string
    postalCode: number
}

@Table({ tableName: 'address' })
export class Address extends Model< Address, AddressCreationAttr> {
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Ukraine', description: 'country' })
    @Column({ type: DataType.STRING,  allowNull: false , defaultValue :'Ukraine' })
    country: string;

    @ApiProperty({ example: 'Shevchenko', description: 'street' })
    @Column({ type: DataType.STRING, allowNull: false })
    street: string;

    @ApiProperty({ example: '42a', description: 'house number' })
    @Column({ type: DataType.STRING, allowNull: false })
    houseNumber: string;

    @ApiProperty({ example: '42', description: 'room number' })
    @Column({ type: DataType.INTEGER })
    roomNumber: number;

    @ApiProperty({ example: '42', description: 'postal code' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    postalCode: number;

    @ApiProperty({ example: '42-42-42', description: 'house number' })
    @Column({ type: DataType.STRING, allowNull: false })
    phoneNumber: string;

    @ApiProperty({ example: '1', description: 'user id' })
    @ForeignKey(()=> User)
    @Column({ type: DataType.INTEGER })
    userId : number

    @BelongsTo (()=> User)
    user: User
}
