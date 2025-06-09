import { MovieProductionCompany } from 'src/movie-production-companies/entities/movie-production-company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('production_companies')
export class ProductionCompany {
  @PrimaryGeneratedColumn({ name: 'company_id' })
  id: number;

  @Column()
  name: string;

  @Column({ name: 'founding_date' })
  foundingDate: string;

  @Column()
  headquarters: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @OneToMany(()=> MovieProductionCompany, (movieCompany)=> movieCompany.company)
  movieCompany: MovieProductionCompany[]
}
