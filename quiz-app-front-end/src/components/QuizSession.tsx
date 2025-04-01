import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizSession = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const location = useLocation(); 
  const questionsIds = location.state?.questions || [];
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes countdown

  useEffect(() => {
    const handleInterruption = () => {
      // alert("Quiz session interrupted. Your quiz has ended.");
      // navigate("/");
    };

    window.addEventListener("beforeunload", handleInterruption);
    window.addEventListener("visibilitychange", () => {
      if (document.hidden) handleInterruption();
    });

    // Mock data for testing before API implementation
    // const mockQuestions: Question[] = [
    //   {
    //     id: "1",
    //     question: "What is the capital of France?",
    //     options: ["Paris", "London", "Berlin", "Madrid"],
    //     correctAnswer: "Paris",
    //   },
    //   {
    //     id: "2",
    //     question: "Which language runs in a web browser?",
    //     options: ["Java", "C++", "Python", "JavaScript"],
    //     correctAnswer: "JavaScript",
    //   },
    //   {
    //     id: "3",
    //     question: "What does CSS stand for?",
    //     options: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style System", "Creative Styling Syntax"],
    //     correctAnswer: "Cascading Style Sheets",
    //   },
    // ];
    axios
          .get<Question[]>(`http://localhost:3000/quiz/questions-by-quiz/${quizId}`) 
          .then((response) => {
            console.log("Quiz data:", response.data);
            setQuestions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError("Failed to load quizzes.");
            setLoading(false);
          });
    
    // setTimeout(() => {
    //   setQuestions(mockQuestions);
    //   setLoading(false);
    // }, 1000); // Simulate API delay

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleInterruption);
      window.removeEventListener("visibilitychange", handleInterruption);
    };
  }, [quizId, navigate]);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleClearAnswer = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    alert("Quiz submitted!");
    navigate("/");
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Session</h1>
        <span className="text-lg font-semibold text-red-600">⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white shadow-md rounded-lg p-4 relative">
            <h2 className="text-lg font-semibold text-gray-700">{index + 1}. {q.question}</h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(q.id, option)}
                  className={`px-4 py-2 rounded-lg transition-all border text-gray-700 ${selectedAnswers[q.id] === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-200'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswers[q.id] && (
              <button onClick={() => handleClearAnswer(q.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <FaTimesCircle size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSession;
