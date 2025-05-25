import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsString, Length, Min } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateDirectorDto {
  @ApiProperty({
    description: 'Full name of the director',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @IsString()
  @Length(3, 30)
  fullName: string;

  @ApiProperty({
    description: 'Directors birth year',
    example: 1988,
    type: 'integer',
  })
  @IsNumber()
  @Min(1900)
  birthYear: number;

  // @ApiProperty({
  //   description: 'Directed movies',
  //   examples: ['Pilot', 'Super 8'],
  // })
  // @IsArray()
  // @IsObject({ each: true })
  // movies: string[];
}
