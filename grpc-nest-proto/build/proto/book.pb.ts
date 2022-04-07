/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "book";

/** getBooks */
export interface getBooksRequest {}

export interface getBooksResponse {
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
}

export interface getBookByIdRequest {
  id: number;
}

export interface getBookByIdResponse {
  book: Book | undefined;
}

export const BOOK_PACKAGE_NAME = "book";

export interface BookServiceClient {
  getBooks(request: getBooksRequest): Observable<getBooksResponse>;

  getBookById(request: getBookByIdRequest): Observable<getBookByIdResponse>;
}

export interface BookServiceController {
  getBooks(
    request: getBooksRequest
  ):
    | Promise<getBooksResponse>
    | Observable<getBooksResponse>
    | getBooksResponse;

  getBookById(
    request: getBookByIdRequest
  ):
    | Promise<getBookByIdResponse>
    | Observable<getBookByIdResponse>
    | getBookByIdResponse;
}

export function BookServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBooks", "getBookById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("BookService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("BookService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const BOOK_SERVICE_NAME = "BookService";

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
