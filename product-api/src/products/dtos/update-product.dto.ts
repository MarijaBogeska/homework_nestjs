import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct } from './create-product.dto';

// npm i --save @nestjs/mapped-types
export class UpdateProductDto extends PartialType(CreateProduct) {}
