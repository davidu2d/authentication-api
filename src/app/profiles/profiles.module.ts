import { Module } from '@nestjs/common';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './profiles.controller';
import { TenantModule } from '../../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
