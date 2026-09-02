import { Module } from '@nestjs/common';
import { MerchantProductService } from './merchant-product.service.js';
import { MerchantProductController } from './merchant-product.controller.js';

@Module({
  controllers: [MerchantProductController],
  providers: [MerchantProductService],
})
export class MerchantProductModule {}
