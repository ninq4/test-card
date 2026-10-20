import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkRepository } from './link.repository';

@Module({
  providers: [LinkService, LinkRepository],
  exports: [LinkService],
})
export class LinkModule {}
