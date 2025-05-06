import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  HttpCode,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create.book.dto';
import { UpdateBookDto } from './dtos/update.book.dto';
import { BookFilter } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks(
    @Query('author') author: string,
    @Query('minPrice') minPrice: string,
  ) {
    const filters: BookFilter = {
      author,
      minPrice: !Number.isNaN(Number(minPrice)) ? Number(minPrice) : null,
    };
    return this.bookService.getAllBooks(filters);
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  createBook(@Body() body: CreateBookDto) {
    return this.bookService.createBook(body);
  }

  @HttpCode(204)
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.bookService.updateBook(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
