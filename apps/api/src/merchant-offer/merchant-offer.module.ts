import { Module } from '@nestjs/common';
import { MerchantOfferService } from './merchant-offer.service.js';
import { MerchantOfferController } from './merchant-offer.controller.js';

@Module({
  controllers: [MerchantOfferController],
  providers: [MerchantOfferService],
})
export class MerchantOfferModule {}
