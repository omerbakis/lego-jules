import { PartialType } from '@nestjs/swagger';
import { CreateMerchantDto } from './create-merchant.dto.js';

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {}
