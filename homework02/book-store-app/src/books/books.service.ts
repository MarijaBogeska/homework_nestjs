import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Book, BookFilter } from './interfaces/book.interface';
import { CreateBookDto } from './dtos/create.book.dto';
import { v4 as uuid } from 'uuid';
import { UpdateBookDto } from './dtos/update.book.dto';
@Injectable()
export class BooksService {
  private BOOKS_PATH = join(
    process.cwd(),
    'src',
    'books',
    'data',
    'books.json',
  );

  async getAllBooks(filters?: BookFilter) {
    const booksData = await readFile(this.BOOKS_PATH, 'utf-8');

    let books = JSON.parse(booksData) as Book[];
    if (filters?.minPrice) {
      books = books.filter(
        (book) => book.price >= (filters.minPrice as number),
      );
    }
    if (filters?.author) {
      books = books.filter((book) =>
        book.author
          .toLowerCase()
          .includes(filters.author?.toLocaleLowerCase() as string),
      );
    }

    return books;
  }

  async getBookById(id: string) {
    const books = await this.getAllBooks();
    const foundBook = books.find((book) => book.id === id);
    if (!foundBook) throw new NotFoundException('book does not exists');
    return foundBook;
  }

  async saveBooks(books: Book[]) {
    await writeFile(this.BOOKS_PATH, JSON.stringify(books, null, 2), 'utf-8');
  }
  async createBook(body: CreateBookDto) {
    const books = await this.getAllBooks();
    const isExistingBook = books.some((book) => body.title === book.title);
    if (isExistingBook) throw new ConflictException('book already exists');

    const newBook = {
      id: uuid(),
      ...body,
    };

    books.push(newBook);
    await this.saveBooks(books);
    return newBook;
  }

  async updateBook(id: string, body: UpdateBookDto) {
    const books = await this.getAllBooks();
    const foundBook = books.find((book) => book.id === id);
    if (!foundBook) throw new NotFoundException('book not exists');

    const updatedBooks = books.map((book) => {
      if (book === foundBook) return { ...book, ...body };
      return book;
    });

    await this.saveBooks(updatedBooks);
  }

  async deleteBook(id: string) {
    const books = await this.getAllBooks();

    const filteredBooks = books.filter((book) => book.id !== id);
    if (books.length === filteredBooks.length)
      throw new NotFoundException('book does not exists');
    await this.saveBooks(filteredBooks);
  }
}
