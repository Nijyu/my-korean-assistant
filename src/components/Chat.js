import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const aiResponse = await fetchAIResponse(input);
      setMessages((prevMessages) => [...prevMessages, newMessage, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error fetching AI response:', error.response ? error.response.data : error.message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Sorry, something went wrong.' }]);
    }
  };

  const fetchAIResponse = async (userInput) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',  // Use the appropriate model name
          prompt: `User: ${userInput}\nJae-Min:`,
          max_tokens: 100
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('AI Response:', response.data);
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error in fetchAIResponse:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with Jae-Min</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.sender === 'ai' && <img src="/jae-min.png" alt="Jae-Min" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />}
            <p style={{ background: msg.sender === 'user' ? '#cce5ff' : '#f1f1f1', padding: '10px', borderRadius: '10px', maxWidth: '70%', margin: '5px 0' }}>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={sendMessage} style={{ width: '18%', padding: '10px', marginTop: '10px', marginLeft: '2%' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
