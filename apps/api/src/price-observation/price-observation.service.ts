import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class PriceObservationService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.priceObservation.create({ data });
  }

  findAll() {
    return this.prisma.priceObservation.findMany({
      include: { offer: true },
      orderBy: { observedAt: 'desc' },
      take: 100
    });
  }

  findOne(id: string) {
    return this.prisma.priceObservation.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.priceObservation.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.priceObservation.delete({ where: { id } });
  }
}
