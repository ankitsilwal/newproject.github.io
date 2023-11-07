import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "./book.model";
import { BookDto } from "./dto/book.dto";

@Injectable()
export class BookService {
  private books: Book[] = [];

  create(createBookDto: BookDto): Book {
    const {
      title,
      author,
      publicationDate,
      genre,
      description,
    } = createBookDto;
    const book = new Book(
      this.generateUniqueId(),
      title,
      author,
      publicationDate,
      genre,
      description
    );
    this.books.push(book);
    return book;
  }

  getBooks(): Book[] {
    return this.books;
  }

  private generateUniqueId(): string {
    return Date.now().toString();
  }

  
}
