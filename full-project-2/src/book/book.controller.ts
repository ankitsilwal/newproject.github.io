import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
  Put,
  Res,
  HttpStatus,
  
} from "@nestjs/common";
import { BookService } from "./book.service";
import { RolesGuard } from "src/auth/roles.guard";
import { BookDto } from "./dto/book.dto";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/auth/user.decorator";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { UpdateBookDto } from "./dto/updateBookDto";


@UseGuards(RolesGuard, AuthGuard)
@Controller("/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles(["Software Developer"])
  @Post()
  async addBook(
    @Body() bookDto: BookDto,
    @User() user: JwtPayload
  ) {
    try {
      return await this.bookService.create(user.sub, bookDto);
    } catch (err) {
      throw new NotFoundException("Not Found");
    }
  }

  @Get()
  async getBooks() {
    const book = await this.bookService.getBooks();
    return book;
  }


  @Get(":id")
  async findById(@Param("id") id : mongoose.Types.ObjectId){
    return await this.bookService.getBooksById(id).catch(()=>{
      throw new NotFoundException(`Book with ${id} not found`);
    });
  }
  



  @Put(":id")
  async update(
    @Res() response,
    @Param("id") bookid: mongoose.Types.ObjectId,
    @Body() updateBookDto: UpdateBookDto
  ) {
    try {
      const existingBook = await this.bookService.updatebook(
        bookid,
        updateBookDto
      );
      return response.status(HttpStatus.OK).json({
        message: "User Updated",
        existingBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  
}
