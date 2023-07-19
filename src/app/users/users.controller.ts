import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Endpoint to create user',
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find users',
    description: 'Endpoint to find user',
  })
  @ApiResponse({
    status: 200,
    description: 'Created.',
  })
  @ApiResponse({ status: 204, description: 'No Content.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
