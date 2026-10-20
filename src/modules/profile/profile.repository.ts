import { Injectable } from '@nestjs/common';
import { Profile } from '../../generated/prisma/client';
import { PrismaService } from '../../infrastructure/database/prisma.service';
@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}
  findProfile(): Promise<Profile | null> {
    return this.prisma.profile.findFirst();
  }
}
