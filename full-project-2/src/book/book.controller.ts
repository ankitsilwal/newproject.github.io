import { Controller, Post, Body, Get } from "@nestjs/common";
import { BookService } from "./book.service";
import { RolesGuard } from "src/auth/roles.guard";
import { BookDto } from "./dto/book.dto";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(RolesGuard, AuthGuard)
@Controller("/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles(["Software Developer"])
  @Post()
  addBook(@Body() bookDto: BookDto) {
    return this.bookService.create(bookDto);
  }

  @Get()
  async getBooks() {
    const book = await this.bookService.getBooks();
    return book;
  }
}
