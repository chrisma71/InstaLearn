import React from 'react';
import ProgressionTree from './components/ProgressionTree';

const QuizPage: React.FC = () => {
  return (
    <div className="flex flex-row">
      {/* Progression Tree on the left */}
      <div className="w-1/2">
        <ProgressionTree />
      </div>

      {/* Quiz section on the right */}
      <div className="w-1/2 p-4">
        {/* Your quiz UI goes here */}
        <h2>Quiz Section</h2>
        <p>This is where the quiz questions will be displayed.</p>
      </div>
    </div>
  );
};

export default QuizPage;
