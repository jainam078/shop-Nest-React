import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

import { FilesService } from 'src/files/files.service';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private fileService: FilesService,
    private roleService: RolesService,
    private addressService: AddressesService,
  ) {}

  async create(createUserDto: CreateUserDto, image?: any) {
    try {
      const fileName = await this.fileService.createFile(image);
      const hashPassword = await bcrypt.hash(createUserDto.password, 5);
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
        avatar: fileName,
      });
      let role = await this.roleService.getRoleByValue('USER');
      if (!role) {
        role = await this.roleService.create({
          value: 'USER',
          description: 'user',
        });
      }
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (error) {
      throw new HttpException(error.errors, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, image: any) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newAddresses = JSON.parse(updateUserDto.addresses + '');
    if (newAddresses.length) {
      await this.addAddresses(newAddresses, id);
    }

    const fileName = await this.fileService.createFile(image);
    if (fileName && user.avatar) {
      await this.fileService.deleteFile(user.avatar);
    }

    const isModified = await user.update({
      ...updateUserDto,
      addresses: newAddresses || [],
      avatar: fileName,
    });
    if (!isModified)
      throw new HttpException('User not modified', HttpStatus.NOT_MODIFIED);
    return user;
  }

  async remove(id: number) {
    const isDelete = await this.userRepository.destroy({ where: { id } });
    if (!isDelete)
      throw new HttpException('User not delete', HttpStatus.NOT_FOUND);
    return isDelete;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId, {
      include: { all: true },
    });
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('roles', role.id);
      return user;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async addAddresses(addresses: [CreateAddressDto], userId: number) {
    const user = await this.userRepository.findByPk(userId, {
      include: { all: true },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    addresses.forEach(async (address) => {
      try {
        const { id } = await this.addressService.create({ ...address, userId });
        await user.$add('addresses', id);
      } catch (error) {
        throw new HttpException(error.error, HttpStatus.BAD_REQUEST);
      }
    });
  }
}
