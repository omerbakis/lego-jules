import { PartialType } from '@nestjs/swagger';
import { CreateCollectionItemDto } from './create-collection-item.dto.js';

export class UpdateCollectionItemDto extends PartialType(CreateCollectionItemDto) {}
