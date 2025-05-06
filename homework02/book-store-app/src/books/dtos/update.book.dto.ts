import {
  IsNumber,
  IsString,
  Length,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';

const CURRENT_YEAR = Number(new Date().getFullYear());
export class UpdateBookDto {
  @IsString()
  @Length(3, 100)
  @IsOptional()
  title?: string;

  @IsString()
  @Length(3, 30)
  @IsOptional()
  author: string;

  @IsString()
  @Length(3, 30)
  @IsOptional()
  genre: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock: number;

  @IsNumber()
  @Min(1900)
  @Max(CURRENT_YEAR)
  @IsOptional()
  publishedYear: number;

  @IsBoolean()
  @IsOptional()
  isBestseller: boolean;
}
