import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiz extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true, enum: ['easy', 'medium', 'hard'] })
  difficulty: string;

  @Prop({ required: true })
  isPrivate: boolean;

  @Prop({ required: true })
  createdBy: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
