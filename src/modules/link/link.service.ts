import { Injectable } from '@nestjs/common';
import { LinkRepository } from './link.repository';
import type { Link } from '../../generated/prisma/client';

@Injectable()
export class LinkService {
  constructor(private readonly linkRepository: LinkRepository) {}
  async getLinksByProfileIds(ids: readonly string[]): Promise<Link[]> {
    const links = this.linkRepository.findByProfileIds(ids);

    return links;
  }
}
