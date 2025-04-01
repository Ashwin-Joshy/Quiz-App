import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Quiz {
    _id: string;
    name: string;
    time: string;
    difficulty: "Easy" | "Medium" | "Hard";
    questions: string[]; 
}

const Quiz = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const handleStartQuiz = (id: any, questions: string[]) => {
        navigate(`/quiz/${id}`, { state: { questions } });
    };

    useEffect(() => {
        axios
            .get<Quiz[]>("http://localhost:3000/quiz")
            .then((response) => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load quizzes.");
                setLoading(false);
            });
    }, []);
    // useEffect(() => {
    //     // Temporary dummy data until backend is implemented
    //     const dummyQuizzes: Quiz[] = [
    //         { id: "1", name: "JavaScript Basics", time: "10", difficulty: "Easy" },
    //         { id: "2", name: "React Fundamentals", time: "15", difficulty: "Medium" },
    //         { id: "3", name: "Node.js Mastery", time: "20", difficulty: "Hard" },
    //     ];

    //     setTimeout(() => {
    //         setQuizzes(dummyQuizzes);
    //         setLoading(false);
    //     }, 1000); // Simulate API delay
    // }, []);

    if (loading) {
        return <div className="text-center text-lg mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Available Quizzes
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <div
                        onClick={() => handleStartQuiz(quiz._id, quiz.questions)}
                        key={quiz._id}
                        className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{quiz.name}</h2>
                        <p className="text-gray-500">⏳ {quiz.time} minutes</p>
                        <p
                            className={`text-sm font-medium mt-2 inline-block px-3 py-1 rounded-full ${quiz.difficulty === "Easy"
                                ? "bg-green-200 text-green-700"
                                : quiz.difficulty === "Medium"
                                    ? "bg-yellow-200 text-yellow-700"
                                    : "bg-red-200 text-red-700"
                                }`}
                        >
                            {quiz.difficulty}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
