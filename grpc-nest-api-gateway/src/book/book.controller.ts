
import { BOOK_SERVICE_NAME,BOOK_PACKAGE_NAME, getBookByIdRequest, getBookByIdResponse, getBooksRequest, getBooksResponse, Book, BookServiceClient  } from './book.pb';
import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { promises } from 'dns';

@Controller('book')
export class BookController  implements OnModuleInit{
    private svc: BookServiceClient;

    @Inject(BOOK_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<BookServiceClient>(BOOK_SERVICE_NAME);
    }

    @Get()
    async getBooks() : Promise<Observable<getBooksResponse>> {
        return await this.svc.getBooks(null) ;
    }

    @Get(':id')
    async getBookById(@Param('id') id:number): Promise<Observable<getBookByIdResponse>> {
        console.log(id);
        return await this.svc.getBookById({id});
    }
}
