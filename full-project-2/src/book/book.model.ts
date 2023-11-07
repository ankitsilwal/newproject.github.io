export class Book {
  id: string;
  title: string;
  author: string;
  publicationDate: Date;
  genre: string;
  description: string;

  constructor(
    id: string,
    title: string,
    author: string,
    publicationDate: Date,
    genre: string,
    description: string
    
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationDate = publicationDate;
    this.genre = genre;
    this.description = description;
  }
}
