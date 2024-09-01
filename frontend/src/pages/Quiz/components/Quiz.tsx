import React from 'react';

interface QuizProps {
  question: string;
  options: string[];
  onAnswerSelect: (answer: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ question, options, onAnswerSelect }) => {
  return (
    <div className="quiz">
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => onAnswerSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
