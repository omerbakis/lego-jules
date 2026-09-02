import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateCollectionItemDto {
  @IsString()
  appProfileId: string;

  @IsString()
  legoSetId: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsString()
  setCondition?: string;
}
