import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfilesService } from '../../profiles/services/profiles.service';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from './auth.service';

const oneUser = {
  name: 'Joao',
  username: 'teste@teste.com',
  password: '$2b$08$yQEsXMzFzk8vt.yJypk5PeQUD/rWDr3zA81W3BbrjAIEY9o8ii2mS',
  tenantId: 'BRB',
  profile: {
    name: 'CORRESPONDENTE_BANCARIO',
  },
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkLmplcmVtaWFzQHBsYXRmb3JtYnVpbGRlci5pbyIsInN1YiI6MSwicm9sZXMiOiJDT1JSRVNQT05ERU5URV9CQU5DQVJJTyIsImlhdCI6MTY0MTkxNjY3NSwiZXhwIjoxNjQxOTE2OTc1fQ.KffoawSl3A41oNsZDHa9meXsMJ4AonRe3AU7rC0cU74';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            register: jest.fn(),
            sign: jest.fn().mockResolvedValue(jwt),
          },
        },
        {
          provide: ProfilesService,
          useValue: { findOneByName: jest.fn() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: { findOne: jest.fn().mockResolvedValue(oneUser) },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validateUser', () => {
    expect(
      service.validateUser(
        'teste@teste.com',
        '$2b$08$yQEsXMzFzk8vt.yJypk5PeQUD/rWDr3zA81W3BbrjAIEY9o8ii2mS',
        'BRB'
      )
    ).resolves.toEqual(null);
  });

  it('getAccessToken', () => {
    expect(service.getAccessToken(oneUser)).resolves.toEqual({
      access_token: jwt,
    });
  });

  it('decodeUsernameAndPassword', () => {
    const headeBasicEncode = 'Basic dGVzdGVAdGVzdGUuY29tOjEyMzQ1NkBBYmM=';
    expect(
      service.decodeUsernameAndPassword(headeBasicEncode)
    ).resolves.toEqual({ username: 'teste@teste.com', password: '123456@Abc' });
  });

  it('getUserByUsername', () => {
    const username = 'teste@teste.com';
    expect(service.getUserByUsername(username)).resolves.toEqual(oneUser);
  });

  it('getUserByUsernameAndTenantId', () => {
    const username = 'teste@teste.com';
    const tenantId = 'BRB';
    expect(
      service.getUserByUsernameAndTenantId(username, tenantId)
    ).resolves.toEqual(oneUser);
  });
});
