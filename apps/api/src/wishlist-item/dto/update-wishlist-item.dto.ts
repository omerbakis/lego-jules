import { PartialType } from '@nestjs/swagger';
import { CreateWishlistItemDto } from './create-wishlist-item.dto.js';

export class UpdateWishlistItemDto extends PartialType(CreateWishlistItemDto) {}
