import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { HotelsModule } from './hotels/hotels.module';
import { FirebaseModule } from './firebase';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    HotelsModule,
    FirebaseModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    }),
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
