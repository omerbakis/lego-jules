import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateWishlistItemDto {
  @IsString()
  appProfileId: string;

  @IsString()
  legoSetId: string;

  @IsOptional()
  @IsNumber()
  targetPrice?: number;

  @IsOptional()
  @IsString()
  priority?: string;
}
