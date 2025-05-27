import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { PG_ERRORS } from 'src/errors/sqlErrors';

@Injectable()
export class ActorsService {
  constructor(@InjectRepository(Actor) private ActorRepo: Repository<Actor>) {}

  async create(createActorDto: CreateActorDto) {
    try {
      const actor = await this.ActorRepo.save(createActorDto);
      return actor;
    } catch (error) {
      if (error.code === PG_ERRORS.DUPLICATE_CODE) {
        throw new BadRequestException('Actor already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.ActorRepo.find({
      relations: {
        movies: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundActor = await this.ActorRepo.findOne({
        where: { id },
        relations: { movies: true},
      });
      if (!foundActor) {
        throw new NotFoundException('Actor does not exists');
      }
      return foundActor;
    } catch (error) {
      if (error.code === PG_ERRORS.INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    const foundActor = await this.findOne(id);
    if (!foundActor) throw new NotFoundException('Actor does not exists');
    Object.assign(foundActor, updateActorDto);
    await this.ActorRepo.save(foundActor);
  }

  async remove(id: string) {
    try {
      const foundActor = await this.findOne(id);
      if (!foundActor) throw new NotFoundException('Actor does not exists');
      await this.ActorRepo.remove(foundActor);
    } catch (error) {
      if (error.code === PG_ERRORS.INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }
}
