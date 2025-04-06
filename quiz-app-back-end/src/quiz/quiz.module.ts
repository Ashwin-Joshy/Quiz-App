import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Result, ResultSchema } from './schemas/result.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Quiz.name, schema: QuizSchema },
    { name: Question.name, schema: QuestionSchema },
    { name: Result.name, schema: ResultSchema }
  ])],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
