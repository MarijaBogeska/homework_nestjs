import { Module } from '@nestjs/common';
import { ProductionCompaniesService } from './production-companies.service';
import { ProductionCompaniesController } from './production-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionCompany } from './entities/production-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionCompany])],
  controllers: [ProductionCompaniesController],
  providers: [ProductionCompaniesService],
})
export class ProductionCompaniesModule {}
