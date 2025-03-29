import { useState } from "react";

interface User {
  photo: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface QuizAttempt {
  id: string;
  name: string;
  grade: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    photo: "https://via.placeholder.com/100",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    phone: "123-456-7890",
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([
    { id: "1", name: "JavaScript Basics", grade: "A" },
    { id: "2", name: "React Fundamentals", grade: "B+" },
    { id: "3", name: "Node.js Mastery", grade: "A-" },
  ]);

  const [editing, setEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
      
      {/* User Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <img src={user.photo} alt="Profile" className="w-20 h-20 rounded-full border" />
          <div>
            {editing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <h2 className="text-xl font-semibold">{user.name}</h2>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!editing}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!editing}
          />
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!editing}
          />
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Quiz History Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz History</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Quiz</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizAttempts.map((quiz) => (
              <tr key={quiz.id} className="text-center">
                <td className="border p-2">{quiz.name}</td>
                <td className="border p-2 font-bold">{quiz.grade}</td>
                <td className="border p-2">
                  <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded">
                    View Answers
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
