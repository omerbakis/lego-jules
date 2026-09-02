import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceObservationService } from './price-observation.service.js';
import { CreatePriceObservationDto } from './dto/create-price-observation.dto.js';
import { UpdatePriceObservationDto } from './dto/update-price-observation.dto.js';

@Controller('price-observation')
export class PriceObservationController {
  constructor(private readonly priceObservationService: PriceObservationService) {}

  @Post()
  create(@Body() createPriceObservationDto: CreatePriceObservationDto) {
    return this.priceObservationService.create(createPriceObservationDto);
  }

  @Get()
  findAll() {
    return this.priceObservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceObservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceObservationDto: UpdatePriceObservationDto) {
    return this.priceObservationService.update(+id, updatePriceObservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceObservationService.remove(+id);
  }
}
