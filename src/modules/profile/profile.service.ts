import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from '../../generated/prisma/client';
import { ProfileNotFoundException } from './exceptions/profile-not-found.exception';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async getProfile(): Promise<Profile> {
    const profile = await this.profileRepository.findProfile();
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    return profile;
  }
}
