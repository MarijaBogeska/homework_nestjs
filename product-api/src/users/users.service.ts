import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user-entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// nest g resource user-address --no-spec
const DUPLICATE_PG_CODE = '23505';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findAll() {
    return this.usersRepo.find();
  }
  async findUserDetails(id: string) {
    const foundUser = await this.usersRepo.findOne({
      where: { id },
      relations: {
        userAddress: true,
        orders: true,
      },
    });
    if (!foundUser) throw new NotFoundException('userNotFound');
    return foundUser;
  }
  async findById(id: string) {
    try {
      const foundUser = await this.usersRepo.findOneByOrFail({ id });
      return foundUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async create(createData: CreateUserDto) {
    try {
      const newUser = await this.usersRepo.save(createData);
      return newUser;
    } catch (error) {
      if (error.code === DUPLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async update(id: string, updateData: UpdateUserDto) {
    try {
      const foundUser = await this.findById(id);
      Object.assign(foundUser, updateData);
      await this.usersRepo.save(foundUser);
    } catch (error) {
      if (error.code === DUPLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.messsage);
    }
  }
  async delete(id: string) {
    const foundUser = await this.findById(id);
    if (!foundUser) throw new NotFoundException('user does not exists');
    await this.usersRepo.remove(foundUser);
  }
}
