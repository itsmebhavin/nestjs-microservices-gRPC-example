import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { GreetModule } from './greet/greet.module';

@Module({
  imports: [BookModule, GreetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
