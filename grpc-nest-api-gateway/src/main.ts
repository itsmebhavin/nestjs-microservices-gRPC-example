import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
async function bootstrap() {
  const URL = 'localhost:50051';
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       url: URL,
  //       package: 'gateway',
  //       protoPath: path.resolve(__dirname, './../grpc-nest-proto/proto/book.proto'),
  //     },
  //   },
  // );

  await app.listen(3000);
}
bootstrap();