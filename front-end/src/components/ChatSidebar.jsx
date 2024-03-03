import React from 'react';
import styled from 'styled-components';
import axiosInstance from '../app/axiosInstance';
import { useSelector } from 'react-redux';


const StyledListItem = styled.li`
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #6b7280;
    border-radius: 0.5rem;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ChatSidebar = ({users, findParticularChat}) => {

  const { userInfo } = useSelector((state) => state.userAuth);
  
  const handleUserClick = async (id) => {
    await axiosInstance.post(`/chat/createchat/${id}`);
    findParticularChat(id, userInfo._id)
  }

  return (
    <div className="flex-none w-1/4 bg-gray-300 border-r border-gray-300 rounded-xl">
      <div className="">
        <h2 className="text-lg font-extrabold mb-4 px-3">All Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="py-2 px-2 hover:bg-gray-600 hover:rounded-xl text-lg font-bold tracking-wide" onClick={()=>handleUserClick(user._id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;