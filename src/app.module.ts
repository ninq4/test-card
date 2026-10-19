import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { PrismaModule } from './infrastructure/database/prisma.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
