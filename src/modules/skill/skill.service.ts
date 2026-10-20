import { Injectable } from '@nestjs/common';
import type { Skill } from '../../generated/prisma/client';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}
  async getSkillsByProfileIds(ids: readonly string[]): Promise<Skill[]> {
    const skills = this.skillRepository.findByProfileIds(ids);

    return skills;
  }
}
