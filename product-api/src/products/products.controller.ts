import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './dtos/create-product.dto';
import { NotFoundError } from 'rxjs';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    if (Number.isNaN(Number(id)))
      throw new BadRequestException('invalid id only numbers allowed');
    return this.productService.findById(Number(id));
  }

  @Post()
  create(@Body() body: CreateProduct) {
    return this.productService.create(body);
  }

  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateProductDto) {
    if (Number.isNaN(Number(id)))
      throw new BadRequestException('invalid id only numbers allowed');
    return this.productService.update(Number(id), updateData);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: string) {
    if (Number.isNaN(Number(id)))
      throw new BadRequestException('invalid id only numbers allowed');
    return this.productService.delete(Number(id));
  }
}
