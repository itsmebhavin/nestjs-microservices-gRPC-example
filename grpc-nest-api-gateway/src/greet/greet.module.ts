import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { GreetController } from './greet.controller';
import { GREETER_SERVICE_NAME,GREET_PACKAGE_NAME  } from './greet.pb';
@Module({
  controllers: [GreetController],
  imports: [
    ClientsModule.register([
      {
        name: GREETER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5284',
          package: GREET_PACKAGE_NAME,
          protoPath: resolve(__dirname, '../../../grpc-nest-proto/proto/greet.proto')
        },
      },
    ]),
  ],
})
export class GreetModule {}
