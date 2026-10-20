import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceRepository } from './experience.repository';

@Module({
  providers: [ExperienceService, ExperienceRepository],
  exports: [ExperienceService],
})
export class ExperienceModule {}
