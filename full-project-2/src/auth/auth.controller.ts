import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("login")
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
}
