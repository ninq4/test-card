import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model';
import { ExperienceService } from '../../../modules/experience/experience.service';
import { AchievementModel } from './achievement.model';
import { toAchievementModel } from './experience.mapper';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}
  @ResolveField(() => [AchievementModel])
  async achievements(
    @Parent() experience: ExperienceModel,
  ): Promise<AchievementModel[]> {
    const achievements =
      await this.experienceService.getAchievementsByExperienceIds([
        experience.id,
      ]);
    return achievements.map(toAchievementModel);
  }
}
