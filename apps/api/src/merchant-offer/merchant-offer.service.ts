import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class MerchantOfferService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.merchantOffer.create({ data });
  }

  findAll() {
    return this.prisma.merchantOffer.findMany({
      include: { product: true }
    });
  }

  findOne(id: string) {
    return this.prisma.merchantOffer.findUnique({
      where: { id },
      include: { product: true, observations: true }
    });
  }

  update(id: string, data: any) {
    return this.prisma.merchantOffer.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.merchantOffer.delete({ where: { id } });
  }
}
