import { PartialType } from '@nestjs/swagger';
import { CreateMerchantOfferDto } from './create-merchant-offer.dto.js';

export class UpdateMerchantOfferDto extends PartialType(CreateMerchantOfferDto) {}
