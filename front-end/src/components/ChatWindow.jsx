import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useSelector } from 'react-redux';
import axiosInstance from '../app/axiosInstance';

const ChatWindow = ({ messages, setMessages, id, findParticularChat, userId, members }) => {
  const [text, setText] = useState('');
  const { userInfo } = useSelector((state) => state.userAuth);

  const addMessage = async (id) => {
    try {
      if (text.trim() === "") {
        return;
      }
      const senderId = userInfo._id;
      console.log('Members:', members);
      console.log('SenderId:', senderId);
      const receiverId = members?.find((id) => id !== senderId);
      console.log('ReceiverId:', receiverId);
      const newMessage = {
        chatId: id,
        senderId,
        receiverId,
        text,
      };
      console.log(newMessage);
      const { data } = await axiosInstance.post("/chat/addmessage", newMessage);
      findParticularChat(userId, senderId);
      setText("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex-grow">
      <div className="p-4 h-full bg-green-200 flex flex-col justify-between rounded-xl">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <span className="font-semibold">{message.sender}: </span>
            <span>{message.text}</span>
          </div>
        ))}
        <div className="flex flex-row items-center">
          <InputEmoji value={text} onChange={(value) => setText(value)} />
          <button className="bg-green-800 rounded-2xl font-bold text-white px-4 py-2 ml-2" onClick={() => addMessage(id)} >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;