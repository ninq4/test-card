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
import { LoadersFactory } from './graphql/loaders/loaders.factory';
import { LoadersModule } from './graphql/loaders/loaders.module';
import { Request } from 'express';
import { HealthcheckApiModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoadersModule],
      inject: [LoadersFactory],
      useFactory: async (loadersFactory: LoadersFactory) => {
        const { ApolloServerPluginLandingPageLocalDefault } =
          await import('@apollo/server/plugin/landingPage/default');

        return {
          autoSchemaFile: true,
          sortSchema: true,
          playground: false,
          introspection: true,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          includeStacktraceInErrorResponses: false,
          context: ({ req }: { req: Request }) => ({
            req,
            loaders: loadersFactory.create(),
          }),
        };
      },
    }),
    ProfileModule,
    LinkModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
    HealthcheckApiModule,
  ],
  providers: [ProfileResolver, ExperienceResolver, ProjectResolver, DateScalar],
})
export class ApiModule {}
