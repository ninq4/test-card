import { Profile } from '../../../generated/prisma/client';
import { ProfileModel } from './profile.model';

export function toProfileModel(profile: Profile): ProfileModel {
  return {
    id: profile.id,
    name: profile.name,
    description: profile.description,
    headline: profile.headline,
  };
}
