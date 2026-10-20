import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model';
import { AchievementModel } from './achievement.model';
import { toAchievementModel } from './experience.mapper';
import type { Loaders } from '../loaders/loaders.factory';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  @ResolveField(() => [AchievementModel])
  async achievements(
    @Parent() experience: ExperienceModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<AchievementModel[]> {
    const achievements = await loaders.achievementsByExperienceId.load(
      experience.id,
    );
    return achievements.map(toAchievementModel);
  }
}
