import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; 

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: string;

  @Prop({ required: true })
  answer: string;

  @Prop()
  explanation?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
