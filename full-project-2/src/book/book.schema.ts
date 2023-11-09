import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
  versionKey: false,
})
export class Book extends Document {
  id: mongoose.Types.ObjectId;

  @Prop({})
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  author: mongoose.Types.ObjectId;

  @Prop({})
  description: string;

  @Prop({})
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
