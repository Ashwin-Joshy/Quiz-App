import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizDialog from "../utils/QuizDialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isSignUp ? "http://localhost:3000/user/create-user" : "http://localhost:3000/user/login-user";
      const payload = isSignUp ? { email, password, name, phone, image } : { email, password };
      const response = await axios.post(url, payload);
      console.log(isSignUp ? "Signup Success:" : "Login Success:", response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError(isSignUp ? "Signup failed. Please check your details." : "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline ml-1">
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
      <QuizDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isSignUp ? "Signup Success" : "Login Success"}
        actionButton={{ label: "Go to Home", onClick: () => navigate("/") }}
      >
        <p>{isSignUp ? "Your account has been created successfully!" : "Welcome back! You have successfully logged in."}</p>
      </QuizDialog>
    </div>
  );
};

export default Login;
