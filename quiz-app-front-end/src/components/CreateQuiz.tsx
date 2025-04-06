import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { prefix } from "../enums/prefix";

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

interface Quiz {
  name: string;
  time: number;
  difficulty: "Easy" | "Medium" | "Hard";
  isPrivate: boolean;
  questions: Question[];
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz>({
    name: "",
    time: 0,
    difficulty: "Easy",
    isPrivate: false,
    questions: [],
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { question: "", options: ["", "", "", ""], answer: "", explanation: "" }],
    });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${prefix}/quiz/create-new-quiz`, quiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/quiz");
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Name"
        className="w-full p-2 border rounded mb-4"
        value={quiz.name}
        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Time (minutes)"
        className="w-full p-2 border rounded mb-4"
        value={quiz.time}
        onChange={(e) => setQuiz({ ...quiz, time: Number(e.target.value) })}
      />
      <select
        className="w-full p-2 border rounded mb-4"
        value={quiz.difficulty}
        onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value as "Easy" | "Medium" | "Hard" })}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={quiz.isPrivate}
          onChange={(e) => setQuiz({ ...quiz, isPrivate: e.target.checked })}
        />
        Private Quiz
      </label>
      
      {quiz.questions.map((q, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <input
            type="text"
            placeholder="Question"
            className="w-full p-2 border rounded mb-2"
            value={q.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
          />
          {q.options.map((option, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              className="w-full p-2 border rounded mb-2"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...q.options];
                updatedOptions[i] = e.target.value;
                updateQuestion(index, "options", updatedOptions);
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            className="w-full p-2 border rounded mb-2"
            value={q.answer}
            onChange={(e) => updateQuestion(index, "answer", e.target.value)}
          />
          <input
            type="text"
            placeholder="Explanation (Optional)"
            className="w-full p-2 border rounded"
            value={q.explanation}
            onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
          />
        </div>
      ))}
      
      <button onClick={addQuestion} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Question
      </button>
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded ml-4">
        Submit Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
