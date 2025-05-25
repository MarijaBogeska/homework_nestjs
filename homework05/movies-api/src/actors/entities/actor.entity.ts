import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Full name of the actor',
    example: 'J.J. Abrams',
    type: 'string',
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'Actors birth year',
    example: 1988,
    type: 'integer',
  })
  @Column({ type: 'int' })
  birthYear: number;

  @ManyToMany(()=> Movie, (movie)=> movie.actors)
  movies: Movie[]
}
