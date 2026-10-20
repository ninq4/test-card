import type { Experience, Achievement } from '../../../generated/prisma/client';
import { AchievementModel } from './achievement.model';
import { ExperienceModel } from './experience.model';

export function toExperienceModel(experience: Experience): ExperienceModel {
  return {
    id: experience.id,
    company: experience.company,
    position: experience.position,
    description: experience.description,
    location: experience.location,
    startDate: experience.startDate,
    endDate: experience.endDate,
  };
}
export function toAchievementModel(achievement: Achievement): AchievementModel {
  return {
    id: achievement.id,
    text: achievement.text,
  };
}
