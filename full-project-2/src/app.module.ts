import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {MongooseModule} from "@nestjs/mongoose"
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl :10000,
      limit :2,
    }]),

    BookModule,
  ],

  providers: [
    {
      provide : APP_GUARD,
      useClass :RolesGuard,
      
    },

    {
      provide : APP_GUARD,
      useClass : ThrottlerGuard,
    }
    
  ],
})
export class AppModule {}
