import { Module } from '@nestjs/common';
import { LoadersFactory } from './loaders.factory';
import { SkillModule } from '../../../modules/skill/skill.module';
import { ExperienceModule } from '../../../modules/experience/experience.module';
import { ProjectModule } from '../../../modules/project/project.module';
import { LinkModule } from '../../../modules/link/link.module';

@Module({
  imports: [LinkModule, SkillModule, ExperienceModule, ProjectModule],
  providers: [LoadersFactory],
  exports: [LoadersFactory],
})
export class LoadersModule {}
