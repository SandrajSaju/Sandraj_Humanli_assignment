import React, { useEffect, useState } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../app/axiosInstance'
import {io} from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../feature/userAuthSlice'

const UserHomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  const { userInfo } = useSelector((state) => state.userAuth);
  const userId = userInfo._id
  const [users, setUsers] = useState([])
  const [otherUserId, setOtherUserId] = useState("")
  const [members, setMembers] = useState([])
  const [socket, setSocket] = useState("");
  const [onlineUsers, setOnlineUsers] = useState("")

  const findParticularChat = async (userId, otherUserId) => {
    try {
      const { data } = await axiosInstance.get(`/chat/find/${userId}/${otherUserId}`);
      console.log(data);
      if (data) {
        const chatId = data._id;
        setId(chatId)
        setOtherUserId(userId)
        setMembers(data.members)
        const res = await axiosInstance.get(`/chat/user/message/${chatId}`);
        console.log(res);
        if (res) {
          setMessages(res.data)
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axiosInstance.get(`/user/getallusers`)
      if (data) {
        setUsers(data)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUserLogout = async () => {
    try {
      await axiosInstance.post('/user/logout');
      dispatch(userLogout())
      navigate('/')
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllChats()
  }, [users])

  useEffect(()=>{
    const newSocket = io("http://localhost:8080");
    newSocket.on("connect",()=>{
      setSocket(newSocket);
      newSocket.emit("new-user-add",userId);
      newSocket.on('get-users',(users) => {
        setOnlineUsers(users)
      })
    })
    return ()=>{
      newSocket.disconnect();
    }
  },[userId])

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className=" bg-gray-800 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10">
          <h1 className="text-xl font-extrabold tracking-wider">HUMANLI . AI</h1>
          <Link to="/logout" onClick={handleUserLogout} className="text-white hover:text-white bg-red-500 hover:bg-red-800 rounded-md px-2 py-1">Logout</Link>
        </header>
        <div className="flex flex-grow mt-16">
          <ChatSidebar users={users} findParticularChat={findParticularChat} />
          <div className="flex-grow h-full overflow-y-auto">
          <ChatWindow messages={messages} id={id} findParticularChat={findParticularChat} userId={otherUserId} members={members} setMessages={setMessages} userSocket={socket} />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHomeScreen
