import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { User } from 'src/user/entities/user.entity';
import { UserRoles } from './user-roles.enitty';

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example:'1', description:'Unique id'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example:'USER', description:'role name'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false, defaultValue : 'USER' })
    value: string;

    @ApiProperty({example:'description', description:'description'})
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(()=>User, ()=> UserRoles)
    users: User[];
}
