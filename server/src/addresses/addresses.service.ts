import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address) private addressesRepository: typeof Address) { }

  async create(createAddressDto: CreateAddressDto) {
    try {
      const address = await this.addressesRepository.create(createAddressDto)
      return address
    } catch (error) {
      throw new HttpException(error.errors, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    const address = await this.addressesRepository.findAll({include: { all: true }})
    return address
  }

  async findOne(id: number) {
    const address = await this.addressesRepository.findByPk(id)
    if (!address) throw new HttpException('Address not found', HttpStatus.NOT_FOUND)
    return address
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressesRepository.findByPk(id)
    if (!address) throw new HttpException('Address not found', HttpStatus.NOT_FOUND)
    const isModified = await address.update(updateAddressDto)
    if (!isModified) throw new HttpException('Address not modified', HttpStatus.NOT_MODIFIED)
    return address
  }

  async remove(id: number) {
    const isDelete = await this.addressesRepository.destroy({ where: { id } })
    if (!isDelete) throw new HttpException('Address not delete', HttpStatus.NOT_FOUND)
    return isDelete
  }
}
