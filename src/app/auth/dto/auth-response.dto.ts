import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AuthResponseDto {
  @ApiModelProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
