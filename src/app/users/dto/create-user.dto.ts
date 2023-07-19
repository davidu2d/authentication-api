import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserDto {
  @ApiModelProperty({ type: String, example: 'Pastinha' })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ type: String, example: '19100000000' })
  @IsNotEmpty()
  readonly cpf: string;

  @ApiModelProperty({ type: String, example: '11991188899' })
  @IsNotEmpty()
  readonly phone: string;

  @ApiModelProperty({ type: String, example: 'newspace@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ type: String, example: 'q1w2e3r4' })
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty({ type: String, example: 'ADMIN' })
  @IsNotEmpty()
  readonly profile: string;
}
