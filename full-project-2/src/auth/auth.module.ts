import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/users/user.module';
import { UserService } from 'src/users/user.service';
import { User,UserSchema } from 'src/users/user.schema';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy,UserService],
  controllers: [AuthController],
  exports: [JwtModule], 
})
export class AuthModule {}
