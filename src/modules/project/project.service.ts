import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import type { Project } from '../../generated/prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async getProjectsByProfileIds(ids: readonly string[]): Promise<Project[]> {
    const projects = this.projectRepository.findProjectsByProfileIds(ids);
    return projects;
  }
}
