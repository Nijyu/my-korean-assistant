import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startChat = () => {
    navigate('/chat');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Your Korean Assistant!</h1>
      <p>Meet Jae-Min, your guide to Korean culture, language, and travel!</p>
      <img src="path/to/jae-min.png" alt="Jae-Min" style={{ width: '200px', borderRadius: '50%' }} />
      <button onClick={startChat} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>Start Chat</button>
    </div>
  );
};

export default Home;
