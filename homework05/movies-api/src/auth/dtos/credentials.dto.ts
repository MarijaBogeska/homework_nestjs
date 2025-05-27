import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
    type: 'string',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
  })
  @IsString()
  password: string;
}
