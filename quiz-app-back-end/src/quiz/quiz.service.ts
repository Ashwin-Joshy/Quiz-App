import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto, SubmitQuizDto } from './dto/quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Answer } from './schemas/answer.schema';
import { Result } from './schemas/result.schema';

@Injectable()
export class QuizService {
    private quizzes = [
        { id: 1, name: "JavaScript Basics", time: "10", difficulty: "Easy" },
        { id: 2, name: "React Fundamentals", time: "15", difficulty: "Medium" },
        { id: 3, name: "Node.js Mastery", time: "20", difficulty: "Hard" },
    ];
    private questions = {
        1: [
            {
                id: "1",
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Madrid"],
                correctAnswer: "Paris",
            },
            {
                id: "2",
                question: "Which language runs in a web browser?",
                options: ["Java", "C++", "Python", "JavaScript"],
                correctAnswer: "JavaScript",
            },
            {
                id: "3",
                question: "What does CSS stand for?",
                options: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style System", "Creative Styling Syntax"],
                correctAnswer: "Cascading Style Sheets",
            },
        ],
        2: [
            {
                id: "1",
                question: "What is the capital of Japan?",
                options: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
                correctAnswer: "Tokyo",
            },
            {
                id: "2",
                question: "Which language is primarily used for web development?",
                options: ["Java", "C++", "Python", "JavaScript"],
                correctAnswer: "JavaScript",
            },
            {
                id: "3",
                question: "What does HTML stand for?",
                options: ["HyperText Markup Language", "HyperText Markdown Language", "HyperText MultiLanguage", "HyperText Markup Logic"],
                correctAnswer: "HyperText Markup Language",
            },
        ],
        3: [
            {
                id: "1",
                question: "What is the capital of Italy?",
                options: ["Rome", "Paris", "Berlin", "Madrid"],
                correctAnswer: "Rome",
            },
            {
                id: "2",
                question: "Which language is used for styling web pages?",
                options: ["HTML", "JavaScript", "CSS", "Python"],
                correctAnswer: "CSS",
            },
            {
                id: "3",
                question: "What does PHP stand for?",
                options: ["Personal Home Page", "Private Home Page", "PHP Hypertext Preprocessor", "Preprocessor Hypertext PHP"],
                correctAnswer: "PHP Hypertext Preprocessor",
            },
        ]
    }
    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>,
        @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
        @InjectModel(Answer.name) private answerModel: Model<Answer>,
        @InjectModel(Result.name) private resultModel: Model<Result>,
    ) { }

    async getAllQuiz() {
        const quiz = await this.quizModel.find({ isPrivate: false }).exec();
        return quiz
    }

    async getQuestionsByQuizId(id: string) {
        const quiz = await this.quizModel.findById(id)
        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }
        const questions = await this.questionModel.find({ _id: { $in: quiz.questions } }).select('-answer -explanation').exec();
        if (!questions) {
            throw new NotFoundException(`Questions for Quiz ID ${id} not found`);
        }
        return questions;

    }

    getQuizById(id: number) {
        const quiz = this.questions[id]
        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async createNewQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const { name, time, difficulty, isPrivate, questions } = createQuizDto;
        console.log("Inpiut", createQuizDto);


        // Create and save all questions in parallel
        const questionDocs = await Promise.all(
            questions.map(async (question) => {
                const newQuestion = new this.questionModel({
                    question: question.question,
                    options: question.options,
                    answer: question.answer,
                    ...(question.explanation && { explanation: question.explanation })
                });
                return newQuestion.save(); // Return the saved document
            })
        );

        // Extract saved question IDs
        const questionIds = questionDocs.map(q => q._id);

        // Create the quiz with linked questions
        const newQuiz = new this.quizModel({
            name,
            time,
            difficulty,
            createdBy: "admin",
            isPrivate,
            questions: questionIds
        });

        return newQuiz.save();
    }
    async submitQuiz(quizData: SubmitQuizDto, email: string) {
        const { quizId, data }: (any) = quizData;

        const correctAnswersWithQuestions = await this.questionModel.find({ _id: { $in: data.questionId } }).exec();
        const userScore = this.findUserScore(data, correctAnswersWithQuestions);
        const totalScore = correctAnswersWithQuestions.length;
        const percentage = (userScore / totalScore) * 100;
        await this.saveResults(data, quizId, email, correctAnswersWithQuestions);
        return "Quiz submitted successfully! Your score is " + userScore + " out of " + totalScore + " (" + percentage.toFixed(2) + "%)";
    }
    findUserScore(questionIdWithAnswer: any, correctAnswersWithQuestions: any) {
        let score = 0;
        questionIdWithAnswer.forEach((question: any) => {
            const correctAnswer = correctAnswersWithQuestions.find((q: any) => q._id.toString() === question.questionId);
            if (correctAnswer && correctAnswer.answer === question.answer) {
                score++;
            }
        });
        return score;
    }
    saveResults(userAnswerWithQuestionIds: any, quizId: string, email: string, correctAnswersWithQuestions: any) {
        const results = userAnswerWithQuestionIds.map((question: any) => {
            const correctAnswer = correctAnswersWithQuestions.find((q: any) => q._id.toString() === question.questionId);
            return {
                userEmail: email,
                questionId: question.questionId,
                quizId: quizId,
                correctAnswer: correctAnswer.answer,
                userAnswer: question.answer,
                isCorrect: correctAnswer.answer === question.answer,
                attenmptedAt: new Date()
            };
        });
        return this.resultModel.insertMany(results);
    }
}
