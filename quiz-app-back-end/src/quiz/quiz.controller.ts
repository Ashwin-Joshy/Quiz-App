import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/quiz.dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Get()
    getAllQuiz() {
        return this.quizService.getAllQuiz();
    }

    @Get('questions-by-quiz/:id')
    getQuestionsByQuizId(@Param('id') id: string) {
        return this.quizService.getQuestionsByQuizId(id);
    }
    
    @Get(':id')
    getQuizById(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuizById(id);
    }

    @Post('create-new-quiz')
    async createNewQuiz(@Body() createQuizDto: CreateQuizDto) {
        return this.quizService.createNewQuiz(createQuizDto);
    }
}
