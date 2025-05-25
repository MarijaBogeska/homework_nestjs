import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const DUPLICATE_CODE = '23505';
const INVALID_INPUT_CODE = '22P02';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const User = this.UserRepo.create(createUserDto);
      await this.UserRepo.save(User);
      return User;
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.UserRepo.find();
  }

  findOne(id: string) {
    try {
      const foundUser = this.UserRepo.findOneBy({ id });
      if (!foundUser) {
        throw new NotFoundException('User does not exists');
      }
      return foundUser;
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findOne(id);
    if (!foundUser) throw new NotFoundException('User does not exists');
    Object.assign(foundUser, updateUserDto);
    await this.UserRepo.save(foundUser);
  }

  async remove(id: string) {
    try {
      const foundUser = await this.findOne(id);
      if (!foundUser) throw new NotFoundException('User does not exists');
      await this.UserRepo.remove(foundUser);
    } catch (error) {
      if (error.code === INVALID_INPUT_CODE) {
        throw new BadRequestException('Invalid id');
      }
      throw new NotFoundException(error.message);
    }
  }
}
