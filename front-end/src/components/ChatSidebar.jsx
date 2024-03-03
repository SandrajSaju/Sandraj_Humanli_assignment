import React from 'react';

const ChatSidebar = ({users}) => {
    const contacts = ['John Kurishingal', 'Alice In Wonderland', 'Bob', 'Emma', 'Michael'];
  return (
    <div className="flex-none w-1/4 bg-gray-300 border-r border-gray-300 rounded-xl">
      {/* Sidebar content goes here */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        {/* List of contacts */}
        <ul>
          {contacts.map(contact => (
            <li key={contact} className="py-2 hover:bg-gray-600 hover:rounded-xl text-lg font-bold tracking-wide">
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;