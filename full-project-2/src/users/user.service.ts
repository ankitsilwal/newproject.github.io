import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "./user.schema";
import { CreateUSerDto } from "./user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto } from "./updatedto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(
    createUserDto: CreateUSerDto
  ): Promise<{ user: User; accessToken: string }> {
    const { username, password, role } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { user: userWithoutPassword, accessToken };
  }

  getUserByAccessToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      return this.userModel.findById(payload.sub).exec();
    } catch (err) {
      throw new NotFoundException("User not found");
    }
  }

  async findUserById(id: mongoose.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).exec();

    if (!user) {
      throw new NotFoundException("User with this ID does not exist");
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find({}, { password: 0 }).exec();
    return users;
  }


  async updateuser(userid:mongoose.Types.ObjectId, updateUserDto:UpdateUserDto): Promise<User> {
    const existingUser =await this.userModel.findByIdAndUpdate(userid,updateUserDto,{new:true});
    if(!existingUser){
      throw new NotFoundException(`User ${userid} not found`);
    }
    return existingUser
  }





  async deleteuser(userid:mongoose.Types.ObjectId):Promise<User>{
    const deleteUser = await this.userModel.findByIdAndDelete(userid);
    if(!deleteUser){
      throw new NotFoundException(`Student ${userid} not found`)
    }
    return deleteUser;
  }  
}



