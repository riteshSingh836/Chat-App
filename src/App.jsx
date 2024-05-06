
import './App.css'
import React, { useState } from 'react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const socket = io.connect('http://localhost:3000');

const App = () => {

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const User = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = { user: User, text: msg, likes: 0 };

    socket.emit('new-message', {newMessage});

    setMessages([...messages, newMessage]);   //keeping earlier messages and adding new one
    setMsg('');   //setting the input msg as empty
  };

  const messageChange = (e) => {
    setMsg(e.target.value);
  };

  const increaseLikes = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes++;
    setMessages(updatedMessages);
  };

  socket.on('broadcast-message', (message) => {
    const User = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = { user: User, text: msg, likes: 0 };
    setMessages([...messages, newMessage]);   //keeping earlier messages and adding new one
    setMsg('');
})

  return (
    
    <div className='main-container'>
      <h1>Chat Application</h1>
      <div className='message-thread'>
        {messages.map((msg, index) => (
          <div key={index} className='messageBox'>
            <div className='user-message'>
            <div className='user'>{msg.user}</div>:<div className='message'>{msg.text}</div>
            </div>
            <button className='like-btn' onClick={() => increaseLikes(index)}>Like ({msg.likes})</button>
          </div>
        ))}
      </div>

      <div className='input-thread'>
        <input className='input-message' type="text" value={msg} onChange={messageChange} />
        <button className='send-btn' onClick={sendMessage}>Send Message</button>
      </div>

    </div>
  );
};

export default App;

