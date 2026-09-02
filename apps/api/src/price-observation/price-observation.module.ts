import { Module } from '@nestjs/common';
import { PriceObservationService } from './price-observation.service.js';
import { PriceObservationController } from './price-observation.controller.js';

@Module({
  controllers: [PriceObservationController],
  providers: [PriceObservationService],
})
export class PriceObservationModule {}
