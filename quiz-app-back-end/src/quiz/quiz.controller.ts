import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, SubmitQuizDto } from './dto/quiz.dto';
import { JwtAuthGuard } from 'src/user/jwtAuthGuard';

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

    @UseGuards(JwtAuthGuard)
    @Post('submit-quiz')
    async submitQuiz(@Request() req, @Body() data: SubmitQuizDto) {
        return this.quizService.submitQuiz(data, req.user.email);
    }
}
