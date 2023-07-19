import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection } from 'typeorm';

import { Tenant } from './entities/tenant.entity';
import { User } from '../app/users/entities/user.entity';
import { Profile } from '../app/profiles/entities/profile.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        const tenant: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { name: request.headers.tenant } });
        return getConnection(tenant.name);
      },
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class TenantModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        const tenant: Tenant = await this.connection
          .getRepository(Tenant)
          .findOne({ where: { name: req.headers.tenant } });

        if (!tenant) {
          throw new BadRequestException(
            'Database Connection Error',
            'There is a Error with the Database!'
          );
        }

        req.headers.tenant_name = tenant.name;
        req.headers.tenant_secret = tenant.secret_jwt;
        req.headers.tenant_secret_public = tenant.public_secret_jwt;

        try {
          getConnection(tenant.name);
          next();
        } catch (e) {
          const createdConnection: Connection = await createConnection({
            name: tenant.name,
            type: 'mssql',
            host: tenant.database_host,
            port: tenant.database_port,
            username: tenant.database_user,
            password: tenant.database_password,
            database: tenant.database_name,
            entities: [User, Profile],
            synchronize: true,
            logging: true,
            options: { encrypt: false },
          });

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Database Connection Error',
              'There is a Error with the Database!'
            );
          }
        }
      })
      .forRoutes('*');
  }
}
