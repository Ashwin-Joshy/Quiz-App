import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; 


export type ResultDocument = Result & Document;

@Schema()
export class Result {
  @Prop({ required: true })
  userEmail: string;

  @Prop({required: true })
  questionId: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  userAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop({ required: true })
  attenmptedAt: Date;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
