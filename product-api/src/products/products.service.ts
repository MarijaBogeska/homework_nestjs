import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async findAll() {
    return this.productsRepo.find();
  }

  async findById(id: number) {
    const foundProduct = await this.productsRepo.findOneBy({ id });

    if (!foundProduct) throw new NotFoundException('product not found');

    return foundProduct;
  }

  async create(createData: CreateProduct) {
    return this.productsRepo.save(createData);
  }

  async update(id: number, body: UpdateProductDto) {
    const foundProduct = await this.findById(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    Object.assign(foundProduct, body);
    await this.productsRepo.save(foundProduct);
  }

  async delete(id: number) {
    const foundProduct = await this.findById(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    await this.productsRepo.remove(foundProduct);
  }
}
