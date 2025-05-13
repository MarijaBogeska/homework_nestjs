import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private ordersRepo: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepo.create({
      ...createOrderDto,
      user: {
        id: createOrderDto.user,
      },
      products: createOrderDto.products.map((product) => ({ id: product })),
    });
    return this.ordersRepo.save(order);
  }

  findAll() {
    return this.ordersRepo.find();
  }

  async findOne(id: string) {
    const foundOrder = await this.ordersRepo.findOneBy({ id });
    if (!foundOrder) throw new NotFoundException('order does not exists');
    return foundOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const foundOrder = await this.ordersRepo.findOneBy({ id });
    if (!foundOrder) throw new NotFoundException('order does not exists');
    Object.assign(foundOrder, updateOrderDto);
    await this.ordersRepo.save(foundOrder);
  }

  async remove(id: string) {
    const foundOrder = await this.ordersRepo.findOneBy({ id });
    if (!foundOrder) throw new NotFoundException('order does not exists');
    await this.ordersRepo.remove(foundOrder);
  }
}
