import { Module } from '@nestjs/common';
import { AppProfileService } from './app-profile.service.js';
import { AppProfileController } from './app-profile.controller.js';

@Module({
  controllers: [AppProfileController],
  providers: [AppProfileService],
})
export class AppProfileModule {}
