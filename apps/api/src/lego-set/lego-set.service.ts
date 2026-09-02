import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class LegoSetService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.legoSet.findMany({
      orderBy: { setNumber: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.legoSet.findUnique({
      where: { id },
    });
  }
}
