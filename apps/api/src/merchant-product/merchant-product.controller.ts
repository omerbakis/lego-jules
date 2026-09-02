import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerchantProductService } from './merchant-product.service.js';
import { CreateMerchantProductDto } from './dto/create-merchant-product.dto.js';
import { UpdateMerchantProductDto } from './dto/update-merchant-product.dto.js';

@Controller('merchant-product')
export class MerchantProductController {
  constructor(private readonly merchantProductService: MerchantProductService) {}

  @Post()
  create(@Body() createMerchantProductDto: CreateMerchantProductDto) {
    return this.merchantProductService.create(createMerchantProductDto);
  }

  @Get()
  findAll() {
    return this.merchantProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantProductDto: UpdateMerchantProductDto) {
    return this.merchantProductService.update(+id, updateMerchantProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantProductService.remove(+id);
  }
}
