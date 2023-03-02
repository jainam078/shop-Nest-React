import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { FilesModule } from 'src/files/files.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/entities/role.entity';
import { UserRoles } from 'src/roles/entities/user-roles.enitty';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Address, Role, UserRoles]),
    FilesModule,
    RolesModule,
    AddressesModule,
    forwardRef(() => AuthModule),
  ],
  exports:[
    UserService,
  ]
})
export class UserModule {}
