import { PartialType } from '@nestjs/swagger';
import { CreateAppProfileDto } from './create-app-profile.dto.js';

export class UpdateAppProfileDto extends PartialType(CreateAppProfileDto) {}
