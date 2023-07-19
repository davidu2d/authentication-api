import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { ProfilesModule } from '../profiles/profiles.module';
import { TenantModule } from '../../tenant/tenant.module';

@Module({
  imports: [TenantModule, ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
