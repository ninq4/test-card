import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import {
  Achievement,
  Experience,
  Link,
  Project,
  Skill,
} from '../../../generated/prisma/client';
import { LinkService } from '../../../modules/link/link.service';
import { groupByKey } from './group-by-key';
import { SkillService } from '../../../modules/skill/skill.service';
import { ExperienceService } from '../../../modules/experience/experience.service';
import { ProjectService } from '../../../modules/project/project.service';
import { ProjectSkillWithSkill } from '../../../modules/skill/skill.repository';
@Injectable()
export class LoadersFactory {
  constructor(
    private readonly linkService: LinkService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}
  create() {
    return {
      linksByProfileId: new DataLoader<string, Link[]>(
        async (ids: readonly string[]) => {
          const links = await this.linkService.getLinksByProfileIds(ids);
          return groupByKey(ids, links, (link) => link.profileId);
        },
      ),
      skillsByProfileId: new DataLoader<string, Skill[]>(
        async (ids: readonly string[]) => {
          const skills = await this.skillService.getSkillsByProfileIds(ids);
          return groupByKey(ids, skills, (skill) => skill.profileId);
        },
      ),
      experienceByProfileId: new DataLoader<string, Experience[]>(
        async (ids: readonly string[]) => {
          const experiences =
            await this.experienceService.getExperiencesByProfileIds(ids);

          return groupByKey(
            ids,
            experiences,
            (experience) => experience.profileId,
          );
        },
      ),
      achievementsByExperienceId: new DataLoader<string, Achievement[]>(
        async (ids: readonly string[]) => {
          const achievements =
            await this.experienceService.getAchievementsByExperienceIds(ids);
          return groupByKey(
            ids,
            achievements,
            (achievement) => achievement.experienceId,
          );
        },
      ),
      projectsByProfileId: new DataLoader<string, Project[]>(
        async (ids: readonly string[]) => {
          const projects =
            await this.projectService.getProjectsByProfileIds(ids);

          return groupByKey(ids, projects, (project) => project.profileId);
        },
      ),
      skillsByProjectId: new DataLoader<string, ProjectSkillWithSkill[]>(
        async (ids: readonly string[]) => {
          const skills =
            await this.skillService.getProjectSkillsByProjectIds(ids);

          return groupByKey(ids, skills, (skill) => skill.projectId);
        },
      ),
    };
  }
}

export type Loaders = ReturnType<LoadersFactory['create']>;
