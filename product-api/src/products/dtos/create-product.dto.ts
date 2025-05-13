import { IsBoolean, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProduct {
  @IsString()
  @Length(3, 60)
  title: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsBoolean()
  isAvailable: boolean;
}
