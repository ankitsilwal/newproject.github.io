import { Injectable,NotFoundException } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.model";
import { BookDto } from "./dto/book.dto";
import { UpdateBookDto } from "./dto/updateBookDto";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(bookid: string, createBookDto: BookDto): Promise<Book> {
    // const { title,  genre, description } = createBookDto;

    const createdBook = await this.bookModel.create({
      ...createBookDto,
      author: new mongoose.Types.ObjectId(bookid),
    });

    // await createdBook.populate("author").execPopulate();

    return createdBook;
  }

  async getBooks(): Promise<Book[]> {
    const bookss = await this.bookModel
      .find()
      .populate("author", { password: 0 });
    return bookss;
  }



  async getBooksById(id:mongoose.Types.ObjectId):Promise<Book>{
    const book = await this.bookModel.findById(id).exec();

    if(!book){
      throw new NotFoundException(`Book with ${id} not found `);
    }
    return book;
  }




  async updatebook(bookid:mongoose.Types.ObjectId, updateBookDto:UpdateBookDto): Promise<Book> {
    const existingBook =await this.bookModel.findByIdAndUpdate(bookid,updateBookDto,{new:true});
    if(!existingBook){
      throw new NotFoundException(`Book ${bookid} not found`);
    }
    return existingBook;
  }

}
