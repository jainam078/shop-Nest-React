import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/entities/product.entity";
import { ProductAttributes } from "./product-attributes";

interface AttributeCreationAttrs {
    name: string;
    value: string
}


@Table({ tableName: 'attributes' })
export class Attribute extends Model<Attribute, AttributeCreationAttrs> { 
    @ApiProperty({example:'1', description:'Unique id'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example:'color', description:'attribute name'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({example:'black', description:'attribute value'})
    @Column({ type: DataType.STRING, allowNull: false })
    value: string;

    @BelongsToMany(()=>Product, ()=> ProductAttributes)
    products: Product[];
}
