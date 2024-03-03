import React, { useEffect, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useSelector } from 'react-redux';
import axiosInstance from '../app/axiosInstance';

const ChatWindow = ({ messages, setMessages, id, findParticularChat, userId, members, userSocket }) => {
  const [text, setText] = useState('');
  const { userInfo } = useSelector((state) => state.userAuth);

  const [userReceivedMessage, setUserReceivedMessage] = useState(null);
  const [userSentMessage, setUserSentMessage] = useState(null);

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
      setUserSentMessage(newMessage);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const handleUserReceiveMessage = (data) => {
      setUserReceivedMessage({...data,createdAt:new Date()});
    };
    userSocket && userSocket.on("receive-message", handleUserReceiveMessage);
    return () => {
        userSocket && userSocket.off("receive-message", handleUserReceiveMessage);
    };
  }, [userSocket]);

  useEffect(() => {
    if (userReceivedMessage !== null && userReceivedMessage.chatId === id) {
      setMessages((prevMessages) => [...prevMessages, userReceivedMessage]);
    }
  }, [userReceivedMessage, id, setMessages]);

  useEffect(() => {
    if (userSentMessage !== null) {
      userSocket && userSocket.emit("send-message", userSentMessage);
      setUserSentMessage(null);
    }
  }, [userSentMessage, userSocket]);

  return (
    <div className="flex-grow">
      <div className="p-4 h-full bg-green-200 flex flex-col justify-between rounded-xl">
        {messages.map((message, index) => (
          <div key={index} className={message.senderId === userInfo?._id ? 'text-end m-3' : 'text-start m-3'}>
          <div className={message.senderId === userInfo?._id ? 'bg-red-500 inline-block text-white rounded-lg p-2' : 'bg-slate-500 inline-block text-white rounded-lg p-2'}>
              {message.text}
              <div className="text-right text-xs text-white">{new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
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