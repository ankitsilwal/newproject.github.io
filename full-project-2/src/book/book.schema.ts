import * as mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  publicationDate: {
    type: Date,
  },

  genre: {
    type: String,
  },
});

export interface Book extends mongoose.Document {
  title: string;
  author: string;
  description?: string;
  publicationDate: Date;
  genre: string;
}
