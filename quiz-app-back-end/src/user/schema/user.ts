import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdDate: Date;

  @Prop({ required: true })
  updatedDate: Date;

  @Prop([{ quizId: String, questionId: String, resultId: String }])
  quizzesAttended: { quizId: string; questionId: string; resultId: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
