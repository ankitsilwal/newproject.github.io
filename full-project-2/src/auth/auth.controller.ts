import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { CreateUSerDto } from "src/users/user.dto";
import { UserService } from "src/users/user.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UserService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(
        loginDto.username,
        loginDto.password
      );

      return result;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Post("/register")
  async createUser(@Body() createUserDto: CreateUSerDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode ?? 500);
    }
  }
}
