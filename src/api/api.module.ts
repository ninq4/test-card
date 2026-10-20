import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from '../modules/profile/profile.module';
import { ProfileResolver } from './graphql/profile/profile.resolver';
import { LinkModule } from '../modules/link/link.module';
import { SkillModule } from '../modules/skill/skill.module';
import { DateScalar } from './graphql/scalars/date.scalar';
import { ExperienceResolver } from './graphql/experience/experience.resolver';
import { ExperienceModule } from '../modules/experience/experience.module';
import { ProjectModule } from '../modules/project/project.module';
import { ProjectResolver } from './graphql/project/project.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        const { ApolloServerPluginLandingPageLocalDefault } =
          await import('@apollo/server/plugin/landingPage/default');

        return {
          autoSchemaFile: true,
          sortSchema: true,
          playground: false,
          introspection: true,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          includeStacktraceInErrorResponses: false,
        };
      },
    }),
    ProfileModule,
    LinkModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
  ],
  providers: [ProfileResolver, ExperienceResolver, ProjectResolver, DateScalar],
})
export class ApiModule {}
