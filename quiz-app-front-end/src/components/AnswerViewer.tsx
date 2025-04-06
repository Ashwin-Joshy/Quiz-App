import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { prefix } from "../enums/prefix";

interface QuizDetail {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
explanation?: string;
}

const AnswerViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState<QuizDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ quizDetails: QuizDetail[] }>(`${prefix}/quiz/get-quiz-result/${id}`)
      .then((response) => {
        console.log("Quiz Details:", response.data);
        
        if(!response?.data.quizDetails.length) {
            setError("No quiz details found.");
            setLoading(false);
            return;
        }
        setQuizDetails(response.data.quizDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("Failed to load quiz results.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Result</h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back to Profile
        </button>
      </div>

      <div className="space-y-6">
        {quizDetails.map((detail, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {index + 1}. {detail.question}
            </h2>
            <div className="mt-2">
              <p className="text-green-600 font-semibold">
                ✅ Correct Answer: {detail.correctAnswer}
              </p>
              {!detail.isCorrect && (
                <p className="text-red-600 font-semibold">
                  ❌ Your Answer: {detail.userAnswer}
                </p>
              )}
            </div>
            {detail.explanation && (
              <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-gray-700 font-semibold">Explanation:</h3>
                <p>{detail.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerViewer;
