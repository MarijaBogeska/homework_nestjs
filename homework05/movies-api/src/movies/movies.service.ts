import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { PG_ERRORS } from 'src/errors/sqlErrors';
import { ActorsService } from 'src/actors/actors.service';
import { DirectorsService } from 'src/directors/directors.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    private actorsService: ActorsService,
    private directorsService: DirectorsService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const { actors, director, ...movieDto } = createMovieDto;
      let mappedActors = await Promise.all(
        actors.map(async (actorId) => {
          await this.actorsService.findOne(actorId);
          return { id: actorId };
        }),
      );
      await this.directorsService.findOne(director);
      const newMovie = await this.movieRepo.save({
        ...movieDto,
        director: { id: director },
        actors: mappedActors,
      });
      return newMovie;
    } catch (error) {
      if (error.code === PG_ERRORS.DUPLICATE_CODE) {
        throw new BadRequestException('Movie already exists');
      }

      throw new BadRequestException(error.message);
    }
  }

  async findAll(movieQuery: QueryMoviesDto): Promise<Movie[]> {
    const {
      genre,
      maxDuration,
      minRating,
      title,
      duration,
      rating,
      releaseYear,
    } = movieQuery ?? {};
    const query = this.movieRepo.createQueryBuilder('movie');
    // FILTERS
    if (genre && genre.length > 0) {
      query.andWhere('movie.genres && :genres', { genres: genre });
    }
    if (title) {
      query.andWhere('LOWER(movie.title) = LOWER(:title)', { title });
    }
    if (maxDuration) {
      query.andWhere('movie.duration <= :maxDuration', { maxDuration });
    }
    if (minRating) {
      query.andWhere('movie.rating >= :minRating', { minRating });
    }
    // SORTING
    if (duration?.toUpperCase()) {
      query.addOrderBy('movie.duration', duration);
    }
    if (rating) {
      query.addOrderBy('movie.rating', rating);
    }
    if (releaseYear) {
      query.addOrderBy('movie.release_year', releaseYear);
    }

    return await query.getMany();
  }

  async findOne(id: string) {
    try {
      const foundMovie = await this.movieRepo.findOne({
        where: { id },
        relations: {
          director: true,
          actors: true,
        },
      });
      if (!foundMovie) throw new NotFoundException('movie does not exists');
      return foundMovie;
    } catch (error) {
      if (error.code === PG_ERRORS.INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const foundMovie = await this.findOne(id);
    if (!foundMovie) throw new NotFoundException('movie does not exists');
    Object.assign(foundMovie, updateMovieDto);
    await this.movieRepo.save(foundMovie);
  }

  async remove(id: string) {
    const foundMovie = await this.findOne(id);
    if (!foundMovie) throw new NotFoundException('movie does not exists');
    await this.movieRepo.remove(foundMovie);
  }
}
