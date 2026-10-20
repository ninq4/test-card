import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import type { Link } from '../../generated/prisma/client';

@Injectable()
export class LinkRepository {
  constructor(private readonly prisma: PrismaService) {}
  findByProfileIds(ids: readonly string[]): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: {
        profileId: { in: [...ids] },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
