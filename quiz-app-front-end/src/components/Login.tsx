import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import QuizDialog from "../utils/QuizDialog";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simulated API request (replace with actual API call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error during authentication", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isSignup ? "Sign Up" : "Login"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    {isSignup ? "Already have an account? " : "Don't have an account? "}
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-blue-500 hover:underline"
                    >
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>

            {/* Success Modal */}
            {/* <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
                <DialogPanel className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <DialogTitle className="text-xl font-bold">Login Success</DialogTitle>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Go to Home
                    </button>
                </DialogPanel>
            </Dialog> */}
            <QuizDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Login Success"
                actionButton={{ label: "Go to Home", onClick: () => navigate("/") }}
            >
                <p>You have successfully logged in.</p>
            </QuizDialog>
        </div>
    );
};

export default Login;
