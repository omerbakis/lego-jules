import { Module } from '@nestjs/common';
import { CollectionItemService } from './collection-item.service.js';
import { CollectionItemController } from './collection-item.controller.js';

@Module({
  controllers: [CollectionItemController],
  providers: [CollectionItemService],
})
export class CollectionItemModule {}
