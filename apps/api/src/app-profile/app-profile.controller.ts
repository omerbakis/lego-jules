import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AppProfileService } from './app-profile.service.js';
import { CreateAppProfileDto } from './dto/create-app-profile.dto.js';
import { UpdateAppProfileDto } from './dto/update-app-profile.dto.js';

@Controller('app-profiles')
export class AppProfileController {
  constructor(private readonly appProfileService: AppProfileService) {}

  @Get('dashboard')
  getDashboard() {
    return this.appProfileService.getDashboardSummary();
  }

  @Post()
  create(@Body() createAppProfileDto: CreateAppProfileDto) {
    return this.appProfileService.create(createAppProfileDto);
  }

  @Get()
  findAll() {
    return this.appProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppProfileDto: UpdateAppProfileDto) {
    return this.appProfileService.update(id, updateAppProfileDto);
  }
}
