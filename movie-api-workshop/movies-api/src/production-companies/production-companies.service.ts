import { Injectable } from '@nestjs/common';
import { CreateProductionCompanyDto } from './dto/create-production-company.dto';
import { UpdateProductionCompanyDto } from './dto/update-production-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionCompany } from './entities/production-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionCompaniesService {
  constructor(
    @InjectRepository(ProductionCompany)
    private productionCompanyRepo: Repository<ProductionCompany>,
  ) {}
  create(createProductionCompanyDto: CreateProductionCompanyDto) {
    return 'This action adds a new productionCompany';
  }

  async findAll() {
    const response = await this.productionCompanyRepo
      .createQueryBuilder('company')
      .getRawMany();
    return response;
  }

  async findOne(id: number) {
    const response = await this.productionCompanyRepo
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.movieCompany', 'movieCompany')
      .leftJoinAndSelect('movieCompany.movie', 'movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.castMembers', 'castMembers')
      .leftJoinAndSelect('movie.awards', 'awards')
      .where('company.id = :companyId', { companyId: id })
      .getOne();

    return response;
  }

  update(id: number, updateProductionCompanyDto: UpdateProductionCompanyDto) {
    return `This action updates a #${id} productionCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionCompany`;
  }
}
