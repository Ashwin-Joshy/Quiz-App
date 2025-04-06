import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class QuizDetail {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  userAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop()
  explanation?: string;
}

export type ResultDocument = Result & Document;

@Schema()
export class Result {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  quizName: string;

  @Prop({ required: true })
  scorePercentage: number;

  @Prop({ type: [QuizDetail], required: true })
  quizDetails: QuizDetail[];

  @Prop({ required: true })
  submittedAt: Date;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
