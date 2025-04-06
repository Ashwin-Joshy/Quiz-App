import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Quiz {
    _id: string;
    name: string;
    time: string;
    createdBy: string;
    difficulty: "Easy" | "Medium" | "Hard";
    questions: string[];
}

const Quiz = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn, setIsLoggedIn, getEmail } = useContext(AuthContext)!;

    useEffect(() => {
        const token = localStorage.getItem("token");
    }, []);

    const handleStartQuiz = (id: string, name:string, time:string) => {
        //convert minutes to milliseconds
        const timeInMilliseconds = parseInt(time) * 60 * 1000;
        navigate(`/quiz/${id}`, { state: { name, time:timeInMilliseconds } });
    };

    const handleCreateQuiz = () => {
        navigate("/create-quiz");
    };

    const handleDeleteQuiz = (id: string) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            axios
                .delete(`http://localhost:3000/quiz/delete-quiz/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                })
                .then(() => {
                    setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
                })
                .catch(() => {
                    alert("Failed to delete quiz");
                });
        }
    };

    useEffect(() => {
        axios
            .get<Quiz[]>("http://localhost:3000/quiz")
            .then((response) => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error:", err);
                
                setError("Failed to load quizzes.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-lg mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Available Quizzes</h1>
                {isLoggedIn && (
                    <div className="flex gap-4">
                        <button
                            onClick={handleCreateQuiz}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Quiz
                        </button>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 relative"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{quiz.name}</h2>
                        <p className="text-gray-500">⏳ {quiz.time} minutes</p>
                        <p
                            className={`text-sm font-medium mt-2 inline-block px-3 py-1 rounded-full ${
                                quiz.difficulty === "Easy"
                                    ? "bg-green-200 text-green-700"
                                    : quiz.difficulty === "Medium"
                                    ? "bg-yellow-200 text-yellow-700"
                                    : "bg-red-200 text-red-700"
                            }`}
                        >
                            {quiz.difficulty}
                        </p>
                        <button
                            onClick={() => handleStartQuiz(quiz._id, quiz.name, quiz.time)}
                            className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Quiz
                        </button>

                        {isLoggedIn && getEmail == quiz.createdBy && (
                            <button
                                onClick={() => handleDeleteQuiz(quiz._id)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
