import { ApiPropertyOptional } from '@nestjs/swagger';
import { Genre } from '../enum/genre-movies.enum';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class QueryMoviesDto {
  // FILTERS
  @ApiPropertyOptional({
    description: 'Filter by Movie title',
    example: 'Salt',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by Movie genre',
    enum: Genre,
  })
  @IsOptional()
  @IsEnum(Genre, { each: true })
  genre?: Genre;

  @ApiPropertyOptional({
    description: 'Filter by min movie rating',
    example: 4.5,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  minRating?: number;

  @ApiPropertyOptional({
    description: 'Filter by Movie max duration in minutes',
    example: 110,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDuration?: number;

  //   SORTING
  @ApiPropertyOptional({
    description: 'Sort by movie release year',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  releaseYear?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Sort movie by rating',
    enum: ['ASC', 'DESC'],
  })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  rating?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Sort movie by duration in minutes',
    enum: ['ASC', 'DESC'],
  })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  duration?: 'ASC' | 'DESC';
}
