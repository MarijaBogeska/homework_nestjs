import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Bob',
    type: 'string',
  })
  @IsString()
  @Length(3, 30)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bobsky',
    type: 'string',
  })
  @IsString()
  @Length(3, 30)
  lastName: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
  })
  @IsString()
  @Length(8, 16)
  password: string;
}
