import type { Link } from '../../../generated/prisma/client';
import { LinkModel } from './link.model';

export function toLinkModel(link: Link): LinkModel {
  return {
    id: link.id,
    name: link.name,
    url: link.url,
    sortOrder: link.sortOrder,
  };
}
