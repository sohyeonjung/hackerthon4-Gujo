// src/pages/QuizStart.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const QuizStart: React.FC = () => {
  const { quizid } = useParams<{ quizid: string }>(); // 파라미터는 문자열로 전달됨
  const quizIdNum = quizid ? parseInt(quizid, 10) : 0; // 문자열을 숫자로 변환, 기본값 0

  return (
    <div>
      <h1>Quiz Start</h1>
      <p>Quiz ID: {quizIdNum}</p>
    </div>
  );
};

export default QuizStart;