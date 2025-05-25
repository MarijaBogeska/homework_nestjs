import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { DirectorsModule } from 'src/directors/directors.module';
import { ActorsModule } from 'src/actors/actors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]) ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
