// src/routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // layouts 대신 components로 이동
import Home from './pages/Home';
// import QuizCreate from './pages/QuizCreate';
// import QuizEdit from './pages/QuizEdit';
// import QuizList from './pages/QuizList';
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
            {/* <Route index element={<QuizList />} />
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
            <Route path="result/:id" element={<QuizResult />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;