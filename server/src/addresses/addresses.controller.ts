import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';


@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}
  
  @ApiOperation({ summary: 'Create address' })
  @ApiResponse({ status: 200, type: Address })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @ApiOperation({ summary: 'Get all address' })
  @ApiResponse({ status: 200, type: [Address] })
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @ApiOperation({ summary: 'Get address by id' })
  @ApiResponse({ status: 200, type: Address })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 200, type: Address })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }


  @ApiOperation({ summary: 'Delete by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
