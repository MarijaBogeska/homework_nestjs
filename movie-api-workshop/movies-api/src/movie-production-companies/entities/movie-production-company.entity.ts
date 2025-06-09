import { Movie } from 'src/movies/entities/movie.entity';
import { ProductionCompany } from 'src/production-companies/entities/production-company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('movie_production_companies')
export class MovieProductionCompany {
  @PrimaryColumn({ name: 'movie_id' })
  movieId: number;

  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'investment_amount' })
  investmentAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => Movie, (movie) => movie.movieCompany)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;

  @ManyToOne(() => ProductionCompany, (company) => company.movieCompany)
  @JoinColumn({
    name: 'company_id',
  })
  company: ProductionCompany;
}
