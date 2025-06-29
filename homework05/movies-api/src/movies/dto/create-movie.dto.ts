import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Genre } from '../enum/genre-movies.enum';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';


export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Salt',
    type: 'string',
  })
  @IsString()
  @Length(3, 30)
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example:
      'Evelyn Salt (Angelina Jolie) is tortured in a prison in North Korea on suspicion of being a U.S. spy.',
    type: 'string',
  })
  @IsString()
  @Length(5, 150)
  description: string;

  @ApiProperty({
    description: 'Movie release year',
    example: 2016,
    type: 'integer',
  })
  @IsNumber()
  @Min(1990)
  release_year: number;

  @ApiProperty({
    description: 'Movie genres',
    examples: [`Genre.action`, Genre.comedy, Genre.documentary],
  })
  @IsArray()
  @IsEnum(Genre, { each: true })
  genres: Genre[];

  @ApiProperty({
    description: 'Movie duration in minutes',
    example: 110,
    type: 'integer',
  })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({
    description: 'Movie rating',
    example: 4.5,
    type: 'number',
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @ApiPropertyOptional({
    description: 'Movie poster url',
    example: 'https://example.com',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @Length(7, 2000)
  poster_url?: string;

  @ApiProperty({
    description: 'Movie director full name',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @IsUUID('4', { message: 'Invalid uuid' })
  @IsString()
  director: string;

  @ApiProperty({
    description: 'Movie actors full names',
    examples: ['Pyotr Fyodorov', 'Nikolay Komlev'],
  })
  @IsUUID('4', { each: true, message: 'Invalid uuid' })
  @IsArray()
  @IsString({ each: true, })
  actors: string[];
}
