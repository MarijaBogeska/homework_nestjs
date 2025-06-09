import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn({ name: 'award_id' })
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  category: string;

  @Column({ name: 'award_type' })
  awardType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ManyToMany(() => Actor, (actor) => actor.awards)
  @JoinTable({
    name: 'actor_awards',
    joinColumn: { name: 'award_id' },
    inverseJoinColumn: { name: 'actor_id' },
  })
  actors: Actor[];

  @ManyToMany(() => Movie, (movie) => movie.awards)
  @JoinTable({
    name: 'movie_awards',
    joinColumn: { name: 'award_id' },
    inverseJoinColumn: { name: 'movie_id' },
  })
  movies: Movie[];
}
