import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import api from "../utils/axiosInstance";
import QuizDialog from "../utils/QuizDialog";

interface Question {
  _id: string;
  question: string;
  options: string[];
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<any>(""); // Assuming quiz result is an object

  useEffect(() => {
    const handleInterruption = () => {
      // alert("Quiz session interrupted. Your quiz has ended.");
      // handleSubmit();
    };

    window.addEventListener("beforeunload", handleInterruption);
    window.addEventListener("visibilitychange", () => {
      if (document.hidden) handleInterruption();
    });

    api
      .get<Question[]>(`http://localhost:3000/quiz/questions-by-quiz/${quizId}`)
      .then((response) => {
        
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quiz.");
        setLoading(false);
      });

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

  const handleSubmit = async () => {
    const userEmail = "test" // Assuming user email is stored after login

    if (!userEmail) {
      alert("User not logged in.");
      navigate("/login");
      return;
    }

    const payload = {
      quizId,
      userEmail,
      data: Object.entries(selectedAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    };

    try {
      const response= await api.post("http://localhost:3000/quiz/submit-quiz", payload);
      console.log("Quiz submitted successfully:", response.data);
      setIsModalOpen(true);
      setQuizResult(response.data);
      //alert("Quiz submitted successfully!");
    } catch (err) {
      alert("Failed to submit quiz.");
    }
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
        <span className="text-lg font-semibold text-red-600">
          ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q._id} className="bg-white shadow-md rounded-lg p-4 relative">
            <h2 className="text-lg font-semibold text-gray-700">
              {index + 1}. {q.question}
            </h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(q._id, option)}
                  className={`px-4 py-2 rounded-lg transition-all border text-gray-700 ${
                    selectedAnswers[q._id] === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswers[q._id] && (
              <button
                onClick={() => handleClearAnswer(q._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
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
      <QuizDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Quiz Completed"}
        actionButton={{ label: "Go to Home", onClick: () => navigate("/") }}
      >
        <p>{quizResult}</p>
      </QuizDialog>
    </div>
  );
};

export default QuizSession;
