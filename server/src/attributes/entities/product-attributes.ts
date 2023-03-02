import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { Product } from 'src/products/entities/product.entity';
import { Attribute } from './attribute.entity';


@Table({ tableName: 'product_attributes', createdAt: false, updatedAt: false })
export class ProductAttributes extends Model<ProductAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;

    @ForeignKey(() => Attribute)
    @Column({ type: DataType.INTEGER })
    attributeId: number;
}