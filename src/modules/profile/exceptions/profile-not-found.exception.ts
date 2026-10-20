import { ApplicationException } from '../../shared/exceptions/application.exception';

export class ProfileNotFoundException extends ApplicationException {
  constructor() {
    super('Profile not found', 404, 'PROFILE_NOT_FOUND');
  }
}
