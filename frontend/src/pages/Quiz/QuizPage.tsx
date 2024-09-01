import React, { useState } from 'react';
import ProgressionTree from './components/ProgressionTree';
import Quiz from './components/Quiz';

const QuizPage: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    // You can also handle what happens after selecting an answer here
  };

  const quizQuestion = "What is the derivative of x^2?";
  const quizOptions = [
    "2x",
    "x",
    "x^2",
    "2"
  ];

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <ProgressionTree />
      </div>
      <div className="w-1/2 p-4">
        <h2>Quiz Section</h2>
        <Quiz 
          question={quizQuestion} 
          options={quizOptions} 
          onAnswerSelect={handleAnswerSelect} 
        />
        {selectedAnswer && (
          <p className="mt-4">
            You selected: <strong>{selectedAnswer}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
