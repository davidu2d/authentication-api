import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { TenantService } from '../../../tenant/services/tenant-service.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserDecodedDto } from '../dto/user-decoded.dto';

@TenantService()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * getAccessToken
   * @param basic
   */
  async getAccessToken(
    basic: string,
    tenantName: string,
    tenantSecret: string
  ): Promise<AuthResponseDto> {
    const userDecoded = (await this.decodeUsernameAndPassword(
      basic
    )) as UserDecodedDto;
    const user = await this.userService.findByEmail(userDecoded.email);
    if (!user || !bcrypt.compareSync(userDecoded.password, user.password))
      throw new UnauthorizedException('User/password invalid'); // TODO tratar mensagem de resposta

    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.profile.name,
      iss: tenantName,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: tenantSecret,
        expiresIn: '300s',
      }),
    } as AuthResponseDto;
  }

  /**
   * decodeUsernameAndPassword
   * @param headerBasicEncode
   */
  async decodeUsernameAndPassword(headerBasicEncode: string) {
    try {
      const userEncode = headerBasicEncode.split(' ');
      const userDecode = userEncode[1];
      let user = {};
      if (userDecode) {
        const temp = Buffer.from(userDecode, 'base64').toString().split(':');
        user = { email: temp[0], password: temp[1] };
      }
      return user;
    } catch (err) {
      console.log(err); // TODO tratar o erro
    }
  }
}
