import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, BelongsToMany, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Product } from 'src/products/entities/product.entity';

interface ImageCreationAttrs {
    path: string;
    productId: number;
}


@Table({ tableName: 'images' })
export class Image extends Model<Image, ImageCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'https://www.meme-arsenal.com/memes/5c4c0337787934ae05d4c5093db3fbfa.jpg', description: 'path to image'})
    @Column({ type: DataType.STRING })
    path: string;

    @ApiProperty({ example: '1', description: 'product id' })
    @ForeignKey(()=> Product)
    @Column({ type: DataType.INTEGER })
    productId : number

    @BelongsTo (()=> Product)
    product: Product
}
