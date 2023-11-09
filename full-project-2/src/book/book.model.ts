import mongoose from "mongoose";

export class Book {
  title: string;
  author: mongoose.Types.ObjectId;
  genre: string;
  description: string;

  constructor(
    title: string,
    author: mongoose.Types.ObjectId,
    genre: string,
    description: string
  ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.description = description;
  }
}
