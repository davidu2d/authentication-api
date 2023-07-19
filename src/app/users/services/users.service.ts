import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from '../../profiles/services/profiles.service';
import { TENANT_CONNECTION } from '../../../tenant/tenant.module';
import { TenantService } from '../../../tenant/services/tenant-service.decorator';
import { Repository } from 'typeorm';

@TenantService()
export class UsersService {
  userRepository: Repository<User>;

  constructor(
    @Inject(TENANT_CONNECTION) private connection,
    private readonly profilesService: ProfilesService
  ) {
    this.userRepository = this.connection.getRepository(User);
  }

  /**
   * create
   * @param createUserDto
   * @return Promise<User>
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const profile = await this.profilesService.findOneByName(
      createUserDto.profile
    );
    if (!profile) throw new BadRequestException('Profile not exist');

    const user = {
      name: createUserDto.name,
      cpf: createUserDto.cpf,
      phone: createUserDto.phone,
      email: createUserDto.email,
      password: bcrypt.hashSync(createUserDto.password, 8),
      status: 'ATIVO',
      profile,
      created_at: new Date(),
    } as User;
    return this.userRepository.save(user);
  }

  /**
   * findAll
   */
  async findAll(): Promise<User[]> {
    const listUser = await this.userRepository.find();
    if (listUser.length < 1) {
      throw new HttpException(listUser, HttpStatus.NO_CONTENT);
    }
    return listUser;
  }

  /**
   * findByEmailAndPassword
   * @param email
   * @return Promise<User>
   */
  async findByEmail(email): Promise<User> {
    return this.userRepository.findOne({ email }, { relations: ['profile'] });
  }
}
