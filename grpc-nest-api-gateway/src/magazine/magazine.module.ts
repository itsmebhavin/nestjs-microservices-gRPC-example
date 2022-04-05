import { Module } from '@nestjs/common';
import { MagazineController } from './magazine.controller';

@Module({
  controllers: [MagazineController]
})
export class MagazineModule {}
