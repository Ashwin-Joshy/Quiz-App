import { Injectable, NotFoundException } from '@nestjs/common';

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
        2:[
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
        3:[
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

    getAllQuiz() {
        return this.quizzes;
    }
    getQuizById(id: number) {
        const quiz = this.questions[id]
        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
}
