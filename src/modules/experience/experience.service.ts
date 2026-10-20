import { Injectable } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';
import type { Achievement, Experience } from '../../generated/prisma/client';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}
  getExperiencesByProfileIds(ids: readonly string[]): Promise<Experience[]> {
    const experiences =
      this.experienceRepository.findExperiencesByProfileIds(ids);

    return experiences;
  }
  getAchievementsByExperienceIds(
    ids: readonly string[],
  ): Promise<Achievement[]> {
    const achievements =
      this.experienceRepository.findAchievementsByExperienceIds(ids);
    return achievements;
  }
}
