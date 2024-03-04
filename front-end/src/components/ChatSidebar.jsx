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
    <div className="flex-none w-1/4 border-r border-gray-300">
      <div className="lg:px-5">
        {/* <h2 className="text-sm lg:text-lg font-semibold lg:font-extrabold mb-4">{userInfo.name.toUpperCase()}</h2> */}
        <hr />
        <ul>
          {users.map(user => (
            <li key={user._id} className={`py-2 px-2 h-14 rounded-sm flex items-center hover:text-white hover:bg-[#ffa429] cursor-pointer text-xs font-medium lg:text-md lg:font-semibold tracking-wider ${selectedUserId === user._id ? ' text-white bg-[#ffa429]' : ''}`} onClick={()=>handleUserClick(user._id)}>
              {user.name.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;