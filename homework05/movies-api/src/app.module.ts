import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database/database.module';
import { DirectorsModule } from './directors/directors.module';
import { ActorsModule } from './actors/actors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    MoviesModule,
    DirectorsModule,
    ActorsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
