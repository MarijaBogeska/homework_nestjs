import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { RoleType } from 'src/roles/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
    type: 'string',
  })
  @Column({ unique: true, type: 'varchar' })
  email: string;

  
  @Column({
    default: RoleType.User,
  })
  role: RoleType;

   @ApiProperty({
    description: 'User first name',
    example: 'Bob',
    type: 'string',
  })
  @Column({ type: 'varchar', name: 'first_name' })
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bobsky',
    type: 'string',
  })
  @Column({ type: 'varchar', name: 'last_name' })
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
  })
  @Exclude()
  @Column({ type: 'varchar' })
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Exclude()
  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];
}
