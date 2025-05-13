import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress) private userAddRepo: Repository<UserAddress>,
  ) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    const newAddress = this.userAddRepo.create({
      ...createUserAddressDto,
      user: { id: createUserAddressDto.user },
    });
    return this.userAddRepo.save(newAddress);
  }

  findAll() {
    return this.userAddRepo.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const foundAddress = await this.userAddRepo.findOneBy({ id });
    if (!foundAddress)
      throw new NotFoundException('User address does not exists');
    return foundAddress;
  }

  async update(id: number, updateData: UpdateUserAddressDto) {
    const foundAddress = await this.findOne(id);
    if (!foundAddress)
      throw new NotFoundException('User address does not exists');
    Object.assign(foundAddress, updateData);
    await this.userAddRepo.save(foundAddress);
  }

  async remove(id: number) {
    const foundAddress = await this.findOne(id);
    if (!foundAddress)
      throw new NotFoundException('User address does not exists');
    await this.userAddRepo.remove(foundAddress)
  }
}
