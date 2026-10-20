import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { Prisma, Skill } from '../../generated/prisma/client';
export type ProjectSkillWithSkill = Prisma.ProjectSkillGetPayload<{
  include: { skill: true };
}>;

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
  findProjectSkillsByProjectIds(
    ids: readonly string[],
  ): Promise<ProjectSkillWithSkill[]> {
    return this.prisma.projectSkill.findMany({
      where: {
        projectId: { in: [...ids] },
      },
      include: {
        skill: true,
      },
      orderBy: { skill: { sortOrder: 'asc' } },
    });
  }
}
