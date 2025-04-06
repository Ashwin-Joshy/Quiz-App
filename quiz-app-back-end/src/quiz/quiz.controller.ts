import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Get('questions-by-quiz/:id')
    getQuestionsByQuizId(@Param('id') id: string) {
        return this.quizService.getQuestionsByQuizId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-all-results')
    async getAllResults(@Request() req) {
        return this.quizService.getAllResults(req.user.email);
    }
    @UseGuards(JwtAuthGuard)
    @Get('get-quiz-result/:id')
    async getQuizResult(@Param('id') id: string, @Request() req) {
        return this.quizService.getQuizResult(id, req.user.email);
    }

    @Get(':id')
    getQuizById(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuizById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-new-quiz')
    async createNewQuiz(@Request() req, @Body() createQuizDto: CreateQuizDto) {
        return this.quizService.createNewQuiz(createQuizDto, req.user.email);
    }

    @UseGuards(JwtAuthGuard)
    @Post('submit-quiz')
    async submitQuiz(@Request() req, @Body() data: SubmitQuizDto) {
        return this.quizService.submitQuiz(data, req.user.email);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-quiz/:id')
    async deleteQuiz(@Param('id') id: string, @Request() req, ) {
        return this.quizService.deleteQuiz(id,req.user.email);
    }


    @Delete('delete-all')
    async deleteAll() {
        return this.quizService.deleteAll();
    }
    
}
