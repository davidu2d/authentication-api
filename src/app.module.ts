import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { ProfilesModule } from './app/profiles/profiles.module';
import { TenantModule } from './tenant/tenant.module';
import { Tenant } from './tenant/entities/tenant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/authentication-api/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port: parseInt(<string>process.env.MSSQL_PORT),
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      entities: [Tenant],
      synchronize: true,
      logging: true,
      options: { encrypt: false },
    }),
    TenantModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
  ],
})
export class AppModule {}
