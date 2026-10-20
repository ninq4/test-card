import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import type { Achievement, Experience } from '../../generated/prisma/client';

@Injectable()
export class ExperienceRepository {
  constructor(private readonly prisma: PrismaService) {}
  findExperiencesByProfileIds(ids: readonly string[]): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      where: {
        profileId: { in: [...ids] },
      },
      orderBy: { startDate: 'desc' },
    });
  }
  findAchievementsByExperienceIds(
    ids: readonly string[],
  ): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({
      where: {
        experienceId: { in: [...ids] },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
