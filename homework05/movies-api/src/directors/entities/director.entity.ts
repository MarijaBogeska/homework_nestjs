import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Full name of the director',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'Directors birth year',
    example: 1988,
    type: 'integer',
  })
  @Column({ type: 'int' })
  birthYear: number;

  @ApiProperty({
    description: 'Directed movies',
    examples: ['Pilot', 'Super 8'],
  })
  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
