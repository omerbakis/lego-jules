import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service.js';
import { MerchantController } from './merchant.controller.js';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
