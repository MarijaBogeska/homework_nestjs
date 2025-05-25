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

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';

@Injectable()
export class ActorsService {
  constructor(@InjectRepository(Actor) private ActorRepo: Repository<Actor>) {}

  async create(createActorDto: CreateActorDto) {
    try {
      const Actor = this.ActorRepo.save(createActorDto);
      return Actor;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Actor already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.ActorRepo.find();
  }

  findOne(id: string) {
    try {
      const foundActor = this.ActorRepo.findOneBy({ id });
      if (!foundActor) {
        throw new NotFoundException('Actor does not exists');
      }
      return foundActor;
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
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
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }
}
