import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { DirectorsModule } from 'src/directors/directors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Actor]), ],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService]
})
export class ActorsModule {}
