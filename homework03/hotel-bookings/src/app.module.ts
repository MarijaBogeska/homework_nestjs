import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hotel-bookings',
      entities: [Room],
      synchronize: true,
    }),
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
