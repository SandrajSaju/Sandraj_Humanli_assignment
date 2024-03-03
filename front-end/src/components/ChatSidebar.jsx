import React from 'react';

const ChatSidebar = ({users}) => {
  return (
    <div className="flex-none w-1/4 bg-gray-300 border-r border-gray-300 rounded-xl">
      <div className="">
        <h2 className="text-lg font-extrabold mb-4 px-3">All Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="py-2 px-2 hover:bg-gray-600 hover:rounded-xl text-lg font-bold tracking-wide">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;