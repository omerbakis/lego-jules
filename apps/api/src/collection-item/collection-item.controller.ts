import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCollectionItemDto } from "./dto/create-collection-item.dto.js";
import { CollectionItemService } from './collection-item.service.js';

@Controller('collection-items')
export class CollectionItemController {
  constructor(private readonly collectionItemService: CollectionItemService) {}

  @Post()
  create(@Body() createDto: CreateCollectionItemDto) {
    return this.collectionItemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.collectionItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.collectionItemService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionItemService.remove(id);
  }
}
