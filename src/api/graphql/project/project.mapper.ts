import type { Project } from '../../../generated/prisma/client';
import { ProjectModel } from './project.model';

export function toProjectModel(project: Project): ProjectModel {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    url: project.url,
  };
}
