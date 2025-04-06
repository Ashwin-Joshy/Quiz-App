import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import CreateQuiz from "./components/CreateQuiz";
import AnswerViewer from "./components/AnswerViewer";
import ProtectedRoute from "./guards/PrivateRouteGuard";
// Lazy loading for performance optimization
const Home = lazy(() => import("./components/Home"));
const Quiz = lazy(() => import("./components/Quiz"));
const QuizSession = lazy(() => import("./components/QuizSession"));
const Profile = lazy(() => import("./components/Profile"));
const Login = lazy(() => import("./components/Login"));


const routes:RouteObject[] = [
  { path: "/", element:<Home /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/login", element: <Login /> },
  { path: "/quiz/:quizId", element: <ProtectedRoute element={<QuizSession />} />},
  { path: "/quiz/get-quiz-result/:id", element: <ProtectedRoute element={<AnswerViewer />} /> },
  { path: "/profile", element: <ProtectedRoute element={<Profile />} />},
  { path: "/create-quiz", element: <ProtectedRoute element={<CreateQuiz />} />}
];

export default routes;
