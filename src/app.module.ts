import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Define o ConfigModule como global para acessar variáveis de ambiente em qualquer lugar
    }),
    DatabaseModule, // Centraliza a conexão ao MongoDB
    AuthModule,
    UsersModule,
    JobsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Define o RolesGuard como guard global
    },
  ],
})
export class AppModule {}
