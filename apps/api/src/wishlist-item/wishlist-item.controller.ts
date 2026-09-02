import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateWishlistItemDto } from "./dto/create-wishlist-item.dto.js";
import { WishlistItemService } from './wishlist-item.service.js';

@Controller('wishlist-items')
export class WishlistItemController {
  constructor(private readonly wishlistItemService: WishlistItemService) {}

  @Post()
  create(@Body() createDto: CreateWishlistItemDto) {
    return this.wishlistItemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.wishlistItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.wishlistItemService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistItemService.remove(id);
  }
}
