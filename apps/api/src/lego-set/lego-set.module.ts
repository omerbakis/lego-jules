import { Module } from '@nestjs/common';
import { LegoSetService } from './lego-set.service.js';
import { LegoSetController } from './lego-set.controller.js';

@Module({
  controllers: [LegoSetController],
  providers: [LegoSetService],
})
export class LegoSetModule {}
