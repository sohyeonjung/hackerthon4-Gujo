// src/routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuizList from "./pages/QuizList";
import QuizCreate from "./pages/QuizCreate";
import QuizEdit from "./pages/QuizEdit";
import QuizPlay from "./pages/QuizPlay";
import QuizResult from "./pages/QuizResult";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "quizzes",
        element: <QuizList />,
      },
      {
        path: "quizzes/create",
        element: <QuizCreate />,
      },
      {
        path: "quizzes/:id/edit",
        element: <QuizEdit />,
      },
      {
        path: "quiz/:pin",
        element: <QuizPlay />,
      },
      {
        path: "quiz/result/:id",
        element: <QuizResult />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route path="quiz">
            <Route index element={<QuizList />} />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <QuizCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <QuizEdit />
                </ProtectedRoute>
              }
            />
            <Route path="play/:id" element={<QuizPlay />} />
            <Route path="result/:id" element={<QuizResult />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
