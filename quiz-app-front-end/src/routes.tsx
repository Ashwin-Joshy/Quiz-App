import { lazy } from "react";
import { RouteObject } from "react-router-dom";
// Lazy loading for performance optimization
const Home = lazy(() => import("./components/Home"));
const Quiz = lazy(() => import("./components/Quiz"));
const QuizSession = lazy(() => import("./components/QuizSession"));
const Profile = lazy(() => import("./components/Profile"));
const Login = lazy(() => import("./components/Login"));


const routes:RouteObject[] = [
  { path: "/", element:<Home /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/quiz/:quizId", element: <QuizSession /> },
  { path: "/profile", element: <Profile /> },
  { path: "/login", element: <Login /> },
];

export default routes;
