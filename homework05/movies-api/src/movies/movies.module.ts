import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ActorsModule } from 'src/actors/actors.module';
import { DirectorsModule } from 'src/directors/directors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), ActorsModule, DirectorsModule ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
