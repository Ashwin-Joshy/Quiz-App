import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  image: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    image: "https://via.placeholder.com/100",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    phone: "123-456-7890"
  });
  ;
  const [prevResults, setPrevResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const saveOrEditProfile = (editStatus:boolean) => {
    setEditing(editStatus);
    if (!editStatus) {
      const token = localStorage.getItem("token");
    axios.put<User>(`http://localhost:3000/user/update-profile`, user,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert("Profile updated successfully");
        setEditing(false);
      })
      .catch(() => {
        alert("Failed to update profile");
      });
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get<User>(`http://localhost:3000/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        alert("Failed to load user details");
      });
    axios.get(`http://localhost:3000/quiz/get-all-results`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        setPrevResults(response.data);
      })
      .catch(() => {
        alert("Failed to load previous results");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleViewAnswer = (id: string) => {
    navigate(`/quiz/get-quiz-result/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>

      {/* User Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full border" />
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
            disabled={true}
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
            onClick={() => saveOrEditProfile(!editing)}
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
              <th className="border p-2">Score</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prevResults.map((quiz) => (
              <tr key={quiz._id} className="text-center">
                <td className="border p-2">{quiz.quizName}</td>
                <td className="border p-2 font-bold">{quiz.scorePercentage}%</td>
                <td className="border p-2">
                  <button onClick={() => handleViewAnswer(quiz._id)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded">
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
