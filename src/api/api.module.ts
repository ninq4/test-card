import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from '../modules/profile/profile.module';
import { ProfileResolver } from './graphql/profile/profile.resolver';

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
  ],
  providers: [ProfileResolver],
})
export class ApiModule {}
