import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema({
    timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})

export class User extends Document {
    id : mongoose.Types.ObjectId

    @Prop({})
    username : string;

    @Prop({
      required:true
    })
    password : string;

    @Prop({})
    role :string;

}


export const UserSchema =SchemaFactory.createForClass(User);