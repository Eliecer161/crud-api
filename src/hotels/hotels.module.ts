import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsSchema } from './schemas/hotel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hotels', schema: HotelsSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService]
})
export class HotelsModule {}
