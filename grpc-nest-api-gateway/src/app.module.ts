import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MagazineModule } from './magazine/magazine.module';

@Module({
  imports: [BookModule, MagazineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
