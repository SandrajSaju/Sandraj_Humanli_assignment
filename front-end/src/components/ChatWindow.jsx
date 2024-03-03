import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';

const ChatWindow = () => {
    const [text, setText] = useState('');
    const messages = [
        { sender: 'John', text: 'Hi there!' },
        { sender: 'You', text: 'Hello!' },
        { sender: 'John', text: 'How are you?' },
        { sender: 'You', text: 'I\'m good, thanks!' },
      ];
  return (
    <div className="flex-grow">
      {/* Chat window content goes here */}
      <div className="p-4 h-full bg-green-200 flex flex-col justify-between rounded-xl">
        {/* Chat messages */}
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <span className="font-semibold">{message.sender}: </span>
            <span>{message.text}</span>
          </div>
        ))}
        <div className="flex flex-row items-center">
            <InputEmoji value={text} onChange={(value) => setText(value)} />
            <button className="bg-green-800 rounded-2xl font-bold text-white px-4 py-2 ml-2" >
                Send
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;