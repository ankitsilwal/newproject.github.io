import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET}`,
      });

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  async validate(payload: any) {
    // Extract user details from the payload
    const user = {
      id: payload.sub, // Assuming "sub" is the user ID in the JWT payload
      username: payload.username, // Modify this according to your payload
      role: payload.role, // Add the user's role from the payload
    };

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
