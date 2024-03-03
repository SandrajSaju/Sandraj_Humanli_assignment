import React, { useState } from 'react';
import axiosInstance from '../app/axiosInstance';
import { useSelector } from 'react-redux';


const ChatSidebar = ({users, findParticularChat}) => {

  const { userInfo } = useSelector((state) => state.userAuth);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = async (id) => {
    await axiosInstance.post(`/chat/createchat/${id}`);
    findParticularChat(id, userInfo._id)
    setSelectedUserId(id);
  }

  return (
    <div className="flex-none w-1/4 bg-gray-400 border-r border-gray-300 rounded-xl">
      <div className="">
        <h2 className="text-lg font-extrabold mb-4 px-3">{userInfo.name}</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className={`py-2 px-2 hover:text-white hover:bg-gray-600 cursor-pointer hover:rounded-xl text-md font-bold tracking-wide ${selectedUserId === user._id ? 'bg-gray-600 text-white rounded-xl' : 'bg-gray-400'}`} onClick={()=>handleUserClick(user._id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;