import { PartialType } from '@nestjs/swagger';
import { CreatePriceObservationDto } from './create-price-observation.dto.js';

export class UpdatePriceObservationDto extends PartialType(CreatePriceObservationDto) {}
