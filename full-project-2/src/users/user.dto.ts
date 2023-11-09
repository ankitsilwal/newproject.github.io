import { IsEnum, IsNotEmpty } from "class-validator";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SOFTWAREDEVELOPER = "Software Developer",
}

export class CreateUSerDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: { type: string; required: true };

  @IsEnum(UserRole)
  role: UserRole;
}
