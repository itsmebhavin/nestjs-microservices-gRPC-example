
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOK_SERVICE_NAME, BOOK_PACKAGE_NAME } from './book.pb';
import {resolve} from 'path';
@Module({
  controllers: [BookController],
  imports: [
    ClientsModule.register([
      {
        name: BOOK_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: BOOK_PACKAGE_NAME,
          protoPath: resolve(__dirname, '../../../grpc-nest-proto/proto/book.proto')
        },
      },
    ]),
  ],
})
export class BookModule {}
