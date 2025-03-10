import React from "react";
import { useParams } from "react-router-dom";

const QuizResult = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>퀴즈 결과</h1>
      <p>퀴즈 ID: {id}</p>
      {/* 퀴즈 결과 표시는 나중에 구현 */}
    </div>
  );
};

export default QuizResult;
