import { ApplicationException } from '../../shared/exceptions/application.exception';

export class ProfileNotFoundException extends ApplicationException {
  constructor() {
    super('Профиль не найден', 404, 'PROFILE_NOT_FOUND');
  }
}
