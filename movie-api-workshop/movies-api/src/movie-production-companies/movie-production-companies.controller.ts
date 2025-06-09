import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieProductionCompaniesService } from './movie-production-companies.service';
import { CreateMovieProductionCompanyDto } from './dto/create-movie-production-company.dto';
import { UpdateMovieProductionCompanyDto } from './dto/update-movie-production-company.dto';

@Controller('movie-production-companies')
export class MovieProductionCompaniesController {
  constructor(private readonly movieProductionCompaniesService: MovieProductionCompaniesService) {}

  @Post()
  create(@Body() createMovieProductionCompanyDto: CreateMovieProductionCompanyDto) {
    return this.movieProductionCompaniesService.create(createMovieProductionCompanyDto);
  }

  @Get()
  findAll() {
    return this.movieProductionCompaniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieProductionCompaniesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieProductionCompanyDto: UpdateMovieProductionCompanyDto) {
    return this.movieProductionCompaniesService.update(+id, updateMovieProductionCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieProductionCompaniesService.remove(+id);
  }
}
