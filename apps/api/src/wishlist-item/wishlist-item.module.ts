import { Module } from '@nestjs/common';
import { WishlistItemService } from './wishlist-item.service.js';
import { WishlistItemController } from './wishlist-item.controller.js';

@Module({
  controllers: [WishlistItemController],
  providers: [WishlistItemService],
})
export class WishlistItemModule {}
