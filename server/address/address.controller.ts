import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get('address-search')
  async getaddress(@Query('addressSearchKey') addressSearchKey: string) {
    const details = await this.addressService.getResult(addressSearchKey);
    return {result: details};
  }
}
