import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SkillService } from '../../../modules/skill/skill.service';
import { ProjectModel } from './project.model';
import { SkillModel } from '../skill/skill.model';
import { toSkillModel } from '../skill/skill.mapper';

@Resolver(() => ProjectModel)
export class ProjectResolver {
  constructor(private readonly skillService: SkillService) {}
  @ResolveField(() => [SkillModel])
  async skills(@Parent() project: ProjectModel): Promise<SkillModel[]> {
    const skills = await this.skillService.getProjectSkillsByProjectIds([
      project.id,
    ]);
    return skills.map(toSkillModel);
  }
}
