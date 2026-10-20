import { Module } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
