import { Module } from '@nestjs/common';
import { MovieProductionCompaniesService } from './movie-production-companies.service';
import { MovieProductionCompaniesController } from './movie-production-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieProductionCompany } from './entities/movie-production-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieProductionCompany])],
  controllers: [MovieProductionCompaniesController],
  providers: [MovieProductionCompaniesService],
})
export class MovieProductionCompaniesModule {}
