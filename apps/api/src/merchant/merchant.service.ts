import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class MerchantService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.merchant.create({ data });
  }

  findAll() {
    return this.prisma.merchant.findMany();
  }

  findOne(id: string) {
    return this.prisma.merchant.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.merchant.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.merchant.delete({ where: { id } });
  }
}
