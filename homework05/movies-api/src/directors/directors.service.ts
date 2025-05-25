import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director) private directorRepo: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    try {
      const director = await this.directorRepo.save(createDirectorDto);
      return director;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('Director already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.directorRepo.find();
  }

  async findOne(id: string) {
    try {
      const foundDirector = await this.directorRepo.findOneBy({ id });
      if (!foundDirector)
        throw new NotFoundException('director does not exists');
      return foundDirector;
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const foundDirector = await this.findOne(id);
    if (!foundDirector) throw new NotFoundException('director does not exists');
    Object.assign(foundDirector, updateDirectorDto);
    await this.directorRepo.save(foundDirector);
  }

  async remove(id: string) {
    try {
      const foundDirector = await this.findOne(id);
      if (!foundDirector)
        throw new NotFoundException('director does not exists');
      await this.directorRepo.remove(foundDirector);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }
}
