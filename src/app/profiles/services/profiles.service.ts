import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Profile } from '../entities/profile.entity';
import { TENANT_CONNECTION } from '../../../tenant/tenant.module';
import { TenantService } from '../../../tenant/services/tenant-service.decorator';
import { Repository } from 'typeorm';

@TenantService()
export class ProfilesService {
  profileRepository: Repository<Profile>;

  constructor(@Inject(TENANT_CONNECTION) private connection) {
    this.profileRepository = connection.getRepository(Profile);
  }

  async create(createProfileDto: CreateProfileDto): Promise<CreateProfileDto> {
    const profile = new Profile();
    profile.name = createProfileDto.name;
    profile.created_at = new Date();
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    const listProfile = await this.profileRepository.find();
    if (listProfile.length < 1) {
      throw new HttpException(listProfile, HttpStatus.NO_CONTENT);
    }
    return listProfile;
  }

  async findOne(id: number): Promise<Profile> {
    const profile = this.profileRepository.findOne(id);
    if (!profile) {
      throw new HttpException(profile, HttpStatus.NO_CONTENT);
    }
    return profile;
  }

  async findOneByName(name: string): Promise<Profile | undefined> {
    const profile = await this.profileRepository.findOne({ name: name });
    if (!profile) {
      throw new HttpException(profile, HttpStatus.NO_CONTENT);
    }
    return profile;
  }
}
