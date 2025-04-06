import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  options: string[];

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  explanation?: string;
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class SubmittedDataDto {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class SubmitQuizDto{
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsString()
  @IsNotEmpty()
  quizName: string;
  
  @IsString()
  @IsNotEmpty()
  userEmail: string; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmittedDataDto)
  data: SubmittedDataDto[];
}
