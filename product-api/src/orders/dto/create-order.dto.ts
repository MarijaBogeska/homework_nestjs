import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsDateString()
  date: string;

  @IsString()
  user: string;

  @IsNumber({}, { each: true })
  products: number[];
}
