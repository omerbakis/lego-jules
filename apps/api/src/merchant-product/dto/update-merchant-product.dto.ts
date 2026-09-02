import { PartialType } from '@nestjs/swagger';
import { CreateMerchantProductDto } from './create-merchant-product.dto.js';

export class UpdateMerchantProductDto extends PartialType(CreateMerchantProductDto) {}
