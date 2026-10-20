import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ProfileModel } from './profile.model';
import { ProfileService } from '../../../modules/profile/profile.service';
import { toProfileModel } from './profile.mapper';
import { LinkModel } from '../link/link.model';
import { toLinkModel } from '../link/link.mapper';
import { SkillModel } from '../skill/skill.model';
import { toSkillModel } from '../skill/skill.mapper';
import { ExperienceModel } from '../experience/experience.model';
import { toExperienceModel } from '../experience/experience.mapper';
import { ProjectModel } from '../project/project.model';
import { toProjectModel } from '../project/project.mapper';
import type { Loaders } from '../loaders/loaders.factory';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}
  @Query(() => ProfileModel, { description: 'Получение профиля' })
  async profile(): Promise<ProfileModel> {
    const profile = await this.profileService.getProfile();
    return toProfileModel(profile);
  }

  @ResolveField(() => [LinkModel])
  async links(
    @Parent() profile: ProfileModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<LinkModel[]> {
    const links = await loaders.linksByProfileId.load(profile.id);
    return links.map(toLinkModel);
  }

  @ResolveField(() => [SkillModel])
  async skills(
    @Parent() profile: ProfileModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<SkillModel[]> {
    const skills = await loaders.skillsByProfileId.load(profile.id);
    return skills.map(toSkillModel);
  }
  @ResolveField(() => [ExperienceModel])
  async experience(
    @Parent() profile: ProfileModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<ExperienceModel[]> {
    const experiences = await loaders.experienceByProfileId.load(profile.id);
    return experiences.map(toExperienceModel);
  }
  @ResolveField(() => [ProjectModel])
  async projects(
    @Parent() profile: ProfileModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<ProjectModel[]> {
    const projects = await loaders.projectsByProfileId.load(profile.id);
    return projects.map(toProjectModel);
  }
}
