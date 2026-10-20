import type { Skill } from '../../../generated/prisma/client';
import { SkillModel } from './skill.model';

export function toSkillModel(skill: Skill): SkillModel {
  return {
    id: skill.id,
    name: skill.name,
  };
}
