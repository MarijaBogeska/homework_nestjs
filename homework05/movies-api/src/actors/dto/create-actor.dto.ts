import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Length, Min } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateActorDto {
  @ApiProperty({
    description: 'Full name of the actor',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @IsString()
  @Length(3, 30)
  fullName: string;

  @ApiProperty({
    description: 'actors birth year',
    example: 1988,
    type: 'integer',
  })
  @IsNumber()
  @Min(1900)
  birthYear: number;

  // @ApiProperty({
  //   description: 'Films the actor acted in',
  //   examples: ['Pilot', 'Super 8'],
  // })
  // @IsArray()
  // @IsString({ each: true })
  // movies: string[];
}
