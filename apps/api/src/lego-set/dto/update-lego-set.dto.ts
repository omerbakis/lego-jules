import { PartialType } from '@nestjs/swagger';
import { CreateLegoSetDto } from './create-lego-set.dto.js';

export class UpdateLegoSetDto extends PartialType(CreateLegoSetDto) {}
