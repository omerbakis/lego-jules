import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service.js';

@Injectable()
export class WishlistItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.wishlistItem.create({ data });
  }

  findAll() {
    return this.prisma.wishlistItem.findMany({
      include: { legoSet: true }
    });
  }

  findOne(id: string) {
    return this.prisma.wishlistItem.findUnique({
      where: { id },
      include: { legoSet: true }
    });
  }

  update(id: string, data: any) {
    return this.prisma.wishlistItem.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.wishlistItem.delete({
      where: { id }
    });
  }
}
