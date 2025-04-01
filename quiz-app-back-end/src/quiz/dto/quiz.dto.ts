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
