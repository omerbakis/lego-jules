import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class CollectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.collectionItem.create({ data });
  }

  findAll() {
    return this.prisma.collectionItem.findMany({
      include: { legoSet: true }
    });
  }

  findOne(id: string) {
    return this.prisma.collectionItem.findUnique({
      where: { id },
      include: { legoSet: true }
    });
  }

  update(id: string, data: any) {
    return this.prisma.collectionItem.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.collectionItem.delete({
      where: { id }
    });
  }
}
