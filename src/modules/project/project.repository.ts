import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import type { Project } from '../../generated/prisma/client';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}
  findProjectsByProfileIds(ids: readonly string[]): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        profileId: { in: [...ids] },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
