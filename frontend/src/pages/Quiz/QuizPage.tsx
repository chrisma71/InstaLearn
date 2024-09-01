import React, { useState } from 'react';
import ProgressionTree from './components/ProgressionTree';
import AppNavbar from '../App Navbar/AppNavbar';
import axios from 'axios';

const QuizPage: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizData, setQuizData] = useState({
    question: "Click on a node to generate a quiz question.",
    answers: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
  });

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleNodeClick = async (nodeName: string) => {
    try {
      const prompt = `
        Generate a quiz question based on the topic "${nodeName}". Provide four answer options, specify the correct answer, and provide a brief explanation. The correct answer will be randomly placed.
        Return the result in the following JSON format:
        {
          "question": "Your question here",
          "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          "correctAnswer": "The correct answer",
          "explanation": "A brief explanation"
        }
      `;
      const response = await axios.post('http://localhost:5000/api/upload', { prompt });
      const quizContent = response.data.description;
      console.log(quizContent)
      const quizJson = quizContent.replace(/```json\n|\n```/g, '').trim();
      const newQuizData = JSON.parse(quizJson);

      setQuizData(newQuizData);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } catch (error) {
      console.error('Error generating quiz question:', error);
      setQuizData({
        question: "Error generating question. Please try again.",
        answers: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      });
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <AppNavbar />

      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <div
          style={{
            width: '50vw',
            height: '100%',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <ProgressionTree onNodeClick={handleNodeClick} />
          </div>
        </div>

        <div
          style={{
            width: '50vw',
            height: '100%',
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '40px' }}>{quizData.question}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {quizData.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '15px 30px',
                  borderRadius: '20px',
                  backgroundColor: selectedAnswer === answer ? '#007bff' : '#f0f0f0',
                  color: selectedAnswer === answer ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  fontSize: '16px',
                  width: '180px',
                  height: '60px',
                }}
              >
                {answer}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <h4 style={{ color: selectedAnswer === quizData.correctAnswer ? 'green' : 'red' }}>
                {selectedAnswer === quizData.correctAnswer ? 'Correct!' : 'Incorrect.'}
              </h4>
              <p>{quizData.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
