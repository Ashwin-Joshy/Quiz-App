import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; 

export type QuestionDocument = Question & Document;

@Schema()
export class Question {

  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  answer: string;

  @Prop()
  explanation?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
