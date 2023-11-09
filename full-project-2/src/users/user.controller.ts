import {
  Controller,
  Post,//
  Body,
  Param,
  NotFoundException,
  Get,
  HttpException,//
  Put,
  Res,
  HttpStatus,
  Delete
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUSerDto } from "./user.dto";       //
import mongoose from "mongoose";
import { response } from "express";         
import { UpdateUserDto } from "./updatedto";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

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

  @Put(":id")
  async update(
    @Res() response,
    @Param("id") userid: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const existingUser = await this.usersService.updateuser(
        userid,
        updateUserDto
      );
      return response.status(HttpStatus.OK).json({
        message: "User Updated",
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }



  @Delete(':id')
  async deleteuser(@Res() response, @Param('id') userid : mongoose.Types.ObjectId){
    try{
      const deleteUser = await this.usersService.deleteuser(userid)

      return response.status(HttpStatus.OK).json({
        message :"User Deleted Successfully",
        deleteUser
      })
    }catch(err){
      return response.status(err.status).json(err.response)
    }
  }

}
