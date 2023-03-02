import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Address } from 'src/addresses/entities/address.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserRoles } from 'src/roles/entities/user-roles.enitty';

interface UserCreationAttrs {
  email: string;
  password: string;
  avatar?: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Unique email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'dsdsfsdfsd', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'first name',
    description: 'first name',
    required: false,
  })
  @Column({ type: DataType.STRING })
  firstName?: string;

  @ApiProperty({
    example: 'last name',
    description: 'last name',
    required: false,
  })
  @Column({ type: DataType.STRING })
  lastName?: string;

  @ApiProperty({
    example: 'patronymic',
    description: 'patronymic',
    required: false,
  })
  @Column({ type: DataType.STRING })
  patronymic?: string;

  @ApiProperty({
    example:
      'https://www.meme-arsenal.com/memes/5c4c0337787934ae05d4c5093db3fbfa.jpg',
    description: 'path to avatar',
    required: false,
  })
  @Column({ type: DataType.STRING })
  avatar?: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
