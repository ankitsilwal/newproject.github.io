import mongoose from "mongoose";

export class BookDto {
  title: string;
  author :mongoose.Types.ObjectId;
  genre: string;
  description: string;
}
