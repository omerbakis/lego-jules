import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerchantOfferService } from './merchant-offer.service.js';
import { CreateMerchantOfferDto } from './dto/create-merchant-offer.dto.js';
import { UpdateMerchantOfferDto } from './dto/update-merchant-offer.dto.js';

@Controller('merchant-offer')
export class MerchantOfferController {
  constructor(private readonly merchantOfferService: MerchantOfferService) {}

  @Post()
  create(@Body() createMerchantOfferDto: CreateMerchantOfferDto) {
    return this.merchantOfferService.create(createMerchantOfferDto);
  }

  @Get()
  findAll() {
    return this.merchantOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantOfferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantOfferDto: UpdateMerchantOfferDto) {
    return this.merchantOfferService.update(+id, updateMerchantOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantOfferService.remove(+id);
  }
}
