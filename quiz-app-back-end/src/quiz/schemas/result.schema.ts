import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; 


export type ResultDocument = Result & Document;

@Schema()
export class Result {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  userAnswer: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
