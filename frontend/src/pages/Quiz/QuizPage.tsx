import React from 'react';
import ProgressionTree from './components/ProgressionTree';

const QuizPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left half: Progression Tree */}
      <div style={{ width: '50vw', height: '100vh' }}>
        <ProgressionTree />
      </div>

      {/* Right half: Quiz Section */}
      <div style={{ width: '50vw', height: '100vh', padding: '20px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
        <h2>Quiz Section</h2>
        <p>Here you can add your quiz questions and content.</p>
        {/* Example Question */}
        <div style={{ marginBottom: '20px' }}>
          <h3>What is the derivative of x^2?</h3>
          <ul>
            <li><input type="radio" name="q1" /> 2x</li>
            <li><input type="radio" name="q1" /> x</li>
            <li><input type="radio" name="q1" /> 2</li>
            <li><input type="radio" name="q1" /> 1</li>
          </ul>
        </div>
        {/* Add more questions here */}
      </div>
    </div>
  );
};

export default QuizPage;
