import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    const aiResponse = await fetchAIResponse(input);
    setMessages([...messages, newMessage, { sender: 'ai', text: aiResponse }]);
  };

  const fetchAIResponse = async (userInput) => {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `User: ${userInput}\nJae-Min:`,
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text.trim();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with Jae-Min</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p>{msg.text}</p>
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
