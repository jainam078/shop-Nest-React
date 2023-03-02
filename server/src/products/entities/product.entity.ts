import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, BelongsToMany, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { ProductAttributes } from 'src/attributes/entities/product-attributes';
import { Comment } from 'src/comments/entities/comment.entity';
import { Image } from 'src/images/entities/image.entity';


interface ProductCreationAttr {
   name: string;
   price: number; 
}

@Table({ tableName: 'products' })
export class Product extends Model< Product, ProductCreationAttr>{
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Bx15', description: 'name' })
    @Column({ type: DataType.STRING,  allowNull: false  })
    name: string;

    @ApiProperty({ example: '42', description: 'price' })
    @Column({ type: DataType.INTEGER,  allowNull: false })
    price: number;

    @ApiProperty({ example: 'good product', description: 'description' })
    @Column({ type: DataType.STRING,   })
    description: string;

    @HasMany(()=> Image)
    images: Image[]

    @HasMany(()=> Comment)
    comments: Comment[]

    @BelongsToMany(()=>Attribute, ()=> ProductAttributes)
    attributes: Attribute[];
}
