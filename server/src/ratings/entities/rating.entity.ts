import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";


interface RatingCreateAttr {
    value: number;
    productId: number;
    userId: number;
}


@Table({ tableName: 'rating' })
export class Rating  extends Model<Rating, RatingCreateAttr> {
    
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 9.3, description: 'Comment' })
    @Column({ type: DataType.DECIMAL, allowNull: false })
    value: number;

    @ApiProperty({ example: '1', description: 'Product id' })
    @ForeignKey(()=> Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @ApiProperty({ example: '1', description: 'User id' })
    @ForeignKey(()=> User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
}
