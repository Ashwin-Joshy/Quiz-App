import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
        Welcome to QuizMaster!
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
        Test your knowledge with fun and challenging quizzes. Compete with others and climb the leaderboard!
      </p>
      <Link
        to="/quiz"
        className="bg-white text-blue-600 px-6 py-3 rounded-2xl text-lg md:text-xl font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
    //   useEffect(() => {
    //     axios
    //       .get<Quiz[]>("https://your-api-endpoint.com/quizzes") // Replace with actual backend API
    //       .then((response) => {
    //         setQuizzes(response.data);
    //         setLoading(false);
    //       })
    //       .catch((error) => {
    //         setError("Failed to load quizzes.");
    //         setLoading(false);
    //       });
    //   }, []);
   
