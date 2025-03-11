// src/routes.tsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"; // layouts 대신 components로 이동
import Home from "./pages/Home";
import QuizList from "./pages/quiz/QuizList";
import QuizCreate from "./pages/quiz/QuizCreate";
import QuizEdit from "./pages/quiz/QuizEdit";

import QuizDetail from "./pages/quiz/QuizDetail";
import ProblemList from "./pages/quiz/ProblemList";
import ProblemCreate from "./pages/quiz/ProblemCreate";

import QuizList from "./pages/quiz/QuizList";
import QuizPlay from "./pages/QuizPlay";
import QuizStart from "./pages/QuizStart";
import ProblemEdit from "./pages/quiz/ProblemEdit";

// import QuizPlay from './pages/QuizPlay';
// import QuizResult from './pages/QuizResult';

// ProtectedRoute 컴포넌트
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user, isLoading, setShowLoginPopup } = useUser();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     setShowLoginPopup(true); // 팝업 띄우기
//     return null; // 페이지 렌더링 중단
//   }

//   return <>{children}</>;
// };

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="quiz">
            <Route index element={<QuizList />} />
            <Route path="create" element={<QuizCreate />} />
            <Route path=":id" element={<QuizDetail />} />
            <Route path=":id/edit" element={<QuizEdit />} />
            <Route path=":id/problems" element={<ProblemList />} />
            <Route path=":id/problems/create" element={<ProblemCreate />} />
             <Route
            path=":id/problems/:problemId/edit"
            element={<ProblemEdit />}
          />
          <Route path="start/:pageNumber" element={<QuizStart />} />
            {/* <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <QuizEdit />
                </ProtectedRoute>
              }
            />
            <Route path="play/:id" element={<QuizPlay />} />
            <Route path="result/:id" element={<QuizResult />} /> */}
          </Route>

        </Route>
        <Route path="quizplay" element={<QuizPlay />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
