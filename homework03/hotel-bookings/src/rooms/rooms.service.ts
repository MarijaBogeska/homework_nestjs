import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import UpdateRoomDto from './dtos/update-room.dto';
import { FiltersRoomDto } from './dtos/filters-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomsRepo: Repository<Room>) {}

  //   GET ALL ROOMS
  async getAll(filters?: FiltersRoomDto): Promise<Room[]> {
    const { roomNumber, type, maxPrice, minPrice, isAvailable } = filters ?? {};
    const query = this.roomsRepo.createQueryBuilder('room');
    // Search by room number
    if (roomNumber) {
      query.andWhere('room.roomNumber = :roomNumber', { roomNumber });
    }
    // Filter by type
    if (type) {
      query.andWhere('room.type = :type', { type });
    }
    // Filter by price range
    if (maxPrice) {
      query.andWhere('room.price <= :maxPrice', { maxPrice });
    }
    if (minPrice) {
      query.andWhere('room.price >= :minPrice', { minPrice });
    }
    // Filter by availability
    if (typeof isAvailable === 'boolean') {
      query.andWhere('room.isAvailable = :isAvailable', { isAvailable });
    }
    return await query.getMany();
  }

  // GET ROOM BY ID
  async getById(id: string) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('room does not exists');
    return room;
  }

  //   CREATE ROOM
  async create(body: CreateRoomDto) {
    const isExisting = await this.roomsRepo.findOneBy({
      roomNumber: body.roomNumber,
    });
    if (isExisting) throw new ConflictException('Room already exists');
    return this.roomsRepo.save(body);
  }

  //   UPDATE ROOM
  async update(id: string, body: UpdateRoomDto) {
    const foundRoom = await this.getById(id);
    if (!foundRoom) throw new NotFoundException('room does not exists');
    Object.assign(foundRoom, body);

    await this.roomsRepo.save(foundRoom);
  }

  //   DELETE ROOM
  async delete(id: string) {
    const foundRoom = await this.getById(id);
    if (!foundRoom) throw new NotFoundException('room does not exists');
    await this.roomsRepo.remove(foundRoom);
  }
}
