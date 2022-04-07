import { getBooksRequest, getBooksResponse,Book, getBookByIdResponse } from '../../grpc-nest-proto/build/proto/book.pb';
import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { GrpcMethod } from '@nestjs/microservices';



@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GrpcMethod('BookService','getBooks')
  @Get()
  async getBooks(getBooksRequest): Promise<getBooksResponse> {
    return { books: await this.bookService.getBooks() }
  }

  @GrpcMethod('BookService','getBookById')
  @Get(':id')
  async getBookById(id:number): Promise<getBookByIdResponse> {
    return {book: await this.bookService.getBookById(id)}
  }
}
