import { Controller, Headers, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Perform login with credentials' })
  @ApiResponse({ status: 200, description: 'Ok', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeader({
    name: 'Authorization',
    description:
      'Authorization type Basic. Example: "Authorization: Basic dGVzdGVAdGVzdGUuY29tOjEyMzQ1Ng=="',
  })
  async create(
    @Headers('Authorization') basic: string,
    @Headers('tenant_name') tenantName: string,
    @Headers('tenant_secret') tenantSecret: string
  ) {
    return await this.authService.getAccessToken(
      basic,
      tenantName,
      tenantSecret
    );
  }
}
