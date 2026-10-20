import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectModel } from './project.model';
import { SkillModel } from '../skill/skill.model';
import { toSkillModel } from '../skill/skill.mapper';
import type { Loaders } from '../loaders/loaders.factory';

@Resolver(() => ProjectModel)
export class ProjectResolver {
  @ResolveField(() => [SkillModel])
  async skills(
    @Parent() project: ProjectModel,
    @Context('loaders') loaders: Loaders,
  ): Promise<SkillModel[]> {
    const skills = await loaders.skillsByProjectId.load(project.id);
    return skills.map((ps) => toSkillModel(ps.skill));
  }
}
