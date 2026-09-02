import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class MerchantProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.merchantProduct.create({ data });
  }

  findAll() {
    return this.prisma.merchantProduct.findMany({
      include: { merchant: true, legoSet: true }
    });
  }

  findOne(id: string) {
    return this.prisma.merchantProduct.findUnique({
      where: { id },
      include: { merchant: true, legoSet: true, offers: true }
    });
  }

  update(id: string, data: any) {
    return this.prisma.merchantProduct.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.merchantProduct.delete({ where: { id } });
  }
}
