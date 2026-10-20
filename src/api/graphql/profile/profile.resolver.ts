import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileModel } from './profile.model';
import { ProfileService } from '../../../modules/profile/profile.service';
import { toProfileModel } from './profile.mapper';
import { LinkService } from '../../../modules/link/link.service';
import { LinkModel } from '../link/link.model';
import { toLinkModel } from '../link/link.mapper';
import { SkillModel } from '../skill/skill.model';
import { SkillService } from '../../../modules/skill/skill.service';
import { toSkillModel } from '../skill/skill.mapper';
import { ExperienceModel } from '../experience/experience.model';
import { ExperienceService } from '../../../modules/experience/experience.service';
import { toExperienceModel } from '../experience/experience.mapper';
import { ProjectModel } from '../project/project.model';
import { ProjectService } from '../../../modules/project/project.service';
import { toProjectModel } from '../project/project.mapper';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly linkService: LinkService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}
  @Query(() => ProfileModel, { description: 'Получение профиля' })
  async profile(): Promise<ProfileModel> {
    const profile = await this.profileService.getProfile();
    return toProfileModel(profile);
  }

  @ResolveField(() => [LinkModel])
  async links(@Parent() profile: ProfileModel): Promise<LinkModel[]> {
    const links = await this.linkService.getLinksByProfileIds([profile.id]);
    return links.map(toLinkModel);
  }

  @ResolveField(() => [SkillModel])
  async skills(@Parent() profile: ProfileModel): Promise<SkillModel[]> {
    const skills = await this.skillService.getSkillsByProfileIds([profile.id]);
    return skills.map(toSkillModel);
  }
  @ResolveField(() => [ExperienceModel])
  async experience(
    @Parent() profile: ProfileModel,
  ): Promise<ExperienceModel[]> {
    const experience = await this.experienceService.getExperiencesByProfileIds([
      profile.id,
    ]);
    return experience.map(toExperienceModel);
  }
  @ResolveField(() => [ProjectModel])
  async projects(@Parent() profile: ProfileModel): Promise<ProjectModel[]> {
    const projects = await this.projectService.getProjectsByProfileIds([
      profile.id,
    ]);
    return projects.map(toProjectModel);
  }
}
