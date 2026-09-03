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

  update(id: string, updateData: UpdateAppProfileDto) {
    return this.prisma.appProfile.update({
      where: { id },
      data: updateData as any
    });
  }

  async getDashboardSummary() {
    const profile = await this.prisma.appProfile.findFirst() || { displayName: 'Default Collector' };
    const collectionItems = await this.prisma.collectionItem.findMany({
      include: { legoSet: true },
      orderBy: { createdAt: 'desc' }
    });

    const distinctSets = new Set(collectionItems.map(i => i.legoSetId)).size;
    const totalCost = collectionItems.reduce((acc, curr) => acc + (curr.purchasePrice || 0), 0);

    const priceObservations = await this.prisma.priceObservation.findMany({
      include: { offer: { include: { product: { include: { legoSet: true } }, merchant: true } } },
      orderBy: { observedAt: 'desc' },
      take: 5
    });

    return {
      profile,
      stats: {
        totalPhysical: collectionItems.length,
        distinctSets,
        totalCost,
        currentZeroValue: 0 // Would be calculated against real latest price observations
      },
      recentCollection: collectionItems.slice(0, 5),
      recentPrices: priceObservations
    };
  }
}
