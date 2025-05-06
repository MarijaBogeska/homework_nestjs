import {
  IsNumber,
  IsString,
  Length,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

const CURRENT_YEAR = Number(new Date().getFullYear());
export class CreateBookDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(3, 30)
  author: string;

  @IsString()
  @Length(3, 30)
  genre: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(1900)
  @Max(CURRENT_YEAR)
  publishedYear: number;

  @IsBoolean()
  isBestseller: boolean;
}
