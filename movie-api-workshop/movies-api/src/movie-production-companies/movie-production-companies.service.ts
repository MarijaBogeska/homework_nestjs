import { Injectable } from '@nestjs/common';
import { CreateMovieProductionCompanyDto } from './dto/create-movie-production-company.dto';
import { UpdateMovieProductionCompanyDto } from './dto/update-movie-production-company.dto';

@Injectable()
export class MovieProductionCompaniesService {
  create(createMovieProductionCompanyDto: CreateMovieProductionCompanyDto) {
    return 'This action adds a new movieProductionCompany';
  }

  findAll() {
    return `This action returns all movieProductionCompanies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieProductionCompany`;
  }

  update(id: number, updateMovieProductionCompanyDto: UpdateMovieProductionCompanyDto) {
    return `This action updates a #${id} movieProductionCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieProductionCompany`;
  }
}
