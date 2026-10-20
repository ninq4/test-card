import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { Skill } from '../../generated/prisma/client';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}
  findByProfileIds(ids: readonly string[]): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: {
        profileId: { in: [...ids] },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
