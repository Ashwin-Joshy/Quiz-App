import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Quiz extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true, enum: ['Easy', 'Medium', 'H ard'] })
  difficulty: string;

  @Prop({ required: true })
  isPrivate: boolean;

  @Prop({ required: true })
  createdBy: string;

  @Prop() 
  questions: Types.ObjectId[]; 
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
