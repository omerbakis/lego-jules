import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';
import { CreateAppProfileDto } from './dto/create-app-profile.dto.js';
import { UpdateAppProfileDto } from './dto/update-app-profile.dto.js';

@Injectable()
export class AppProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAppProfileDto: CreateAppProfileDto) {
    return this.prisma.appProfile.create({
      data: {
        displayName: createAppProfileDto.displayName || 'Default User',
      }
    });
  }

  findAll() {
    return this.prisma.appProfile.findMany();
  }

  findOne(id: string) {
    return this.prisma.appProfile.findUnique({
      where: { id },
    });
  }
}
