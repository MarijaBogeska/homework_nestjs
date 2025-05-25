import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Genre } from '../enum/genre-movies.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Director } from 'src/directors/entities/director.entity';
import { Actor } from 'src/actors/entities/actor.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'Salt',
    type: 'string',
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example:
      'Evelyn Salt (Angelina Jolie) is tortured in a prison in North Korea on suspicion of being a U.S. spy.',
    type: 'string',
  })
  @Column({
    type: 'varchar',
  })
  description: string;

  @ApiProperty({
    description: 'Movie release year',
    example: 2016,
    type: 'integer',
  })
  @Column({ type: 'int' })
  release_year: number;

  @ApiProperty({
    description: 'Movie genres',
    examples: [Genre.action, Genre.comedy, Genre.documentary],
  })
  @Column({
    enum: Genre,
    type: 'enum',
    array: true,
  })
  genres: Genre[];

  @ApiProperty({
    description: 'Movie duration in minutes',
    example: 110,
    type: 'integer',
  })
  @Column({ type: 'int' })
  duration: number;

  @ApiProperty({
    description: 'Movie rating',
    example: 4.5,
    type: 'number',
  })
  @Column({
    type: 'float',
  })
  rating: number;

  @ApiPropertyOptional({
    description: 'Movie poster url',
    example: 'https://example.com',
    type: 'string',
  })
  @Column({ type: 'varchar', default: 'https://example.com' })
  poster_url?: string;

  @ApiProperty({
    description: 'Movie created at',
    example: '2025-01-01',
    required: false,
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Movie updated at',
    example: '2025-01-01',
    required: false,
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Movie director',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @ManyToOne(() => Director, (director) => director.movies)
  director: Director;

  @ApiProperty({
    description: 'Movie actors full names',
    examples: ['Pyotr Fyodorov', 'Nikolay Komlev'],
  })
  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable()
  actors: Actor[];
}
