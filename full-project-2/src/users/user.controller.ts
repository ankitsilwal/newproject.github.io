import {
    Controller,
    Post,
    Body,
    Param,
    NotFoundException,
    Get,
  } from "@nestjs/common";
  import { UserService } from "./user.service";
  import { CreateUSerDto } from "./user.dto";
import mongoose from "mongoose";
  
  @Controller("/users")
  export class UsersController {
    constructor(private readonly usersService: UserService) {}
  
    @Post("/register")
    async createUser(@Body() createUserDto: CreateUSerDto) {
      try {
        return await this.usersService.createUser(createUserDto);
      } catch (err) {
        throw new NotFoundException(`User not found`);
      }
    }

    @Get()
  async findAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }
  
    @Get(":id")
    async findUserById(@Param("id") id: mongoose.Types.ObjectId) {
      return await this.usersService.findUserById(id).catch(() => {
        throw new NotFoundException(`User with ID ${id} not found`);
      });
    }
  }
