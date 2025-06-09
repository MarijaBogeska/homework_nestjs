import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieProductionCompanyDto } from './create-movie-production-company.dto';

export class UpdateMovieProductionCompanyDto extends PartialType(CreateMovieProductionCompanyDto) {}
