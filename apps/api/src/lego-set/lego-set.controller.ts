import { Controller, Get, Param } from '@nestjs/common';
import { LegoSetService } from './lego-set.service.js';

@Controller('lego-sets')
export class LegoSetController {
  constructor(private readonly legoSetService: LegoSetService) {}

  @Get()
  findAll() {
    return this.legoSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legoSetService.findOne(id);
  }
}
