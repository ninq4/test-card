import { Query, Resolver } from '@nestjs/graphql';
import { ProfileModel } from './profile.model';
import { ProfileService } from '../../../modules/profile/profile.service';
import { toProfileModel } from './profile.mapper';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}
  @Query(() => ProfileModel, { description: 'Получение профиля' })
  async profile(): Promise<ProfileModel> {
    const profile = await this.profileService.getProfile();
    return toProfileModel(profile);
  }
}
