import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { ProfilesService } from './profiles.service';

const oneProfile = {
  name: 'CORRESPONDENTE_BANCARIO',
  created_at: new Date(),
};
describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useValue: { save: jest.fn().mockResolvedValue(oneProfile) },
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('created', () => {
    const profile = service.create(oneProfile);
    expect(profile).resolves.toEqual(oneProfile);
  });
});
