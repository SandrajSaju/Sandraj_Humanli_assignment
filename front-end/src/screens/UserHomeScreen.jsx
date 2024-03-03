import React, { useEffect, useState } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../app/axiosInstance'
import { useDispatch } from 'react-redux';
import { userLogout } from '../feature/userAuthSlice'

const UserHomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [users,setUsers] = useState([])

  const getAllChats = async () => {
    try {
        const { data } = await axiosInstance.get(`/user/getallusers`)
        console.log(data);
        if (data) {
          setUsers(data)
        }
    } catch (error) {
        console.log(error.message);
    }
}

  const handleUserLogout = async ()=>{
    try {
        await axiosInstance.post('/user/logout');
        dispatch(userLogout())
        navigate('/')
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    getAllChats()
  },[])

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className=" bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-extrabold tracking-wider">HUMANLI . AI</h1>
            <Link to="/logout" onClick={handleUserLogout} className="text-white hover:text-white bg-red-500 hover:bg-red-800 rounded-md px-2 py-1">Logout</Link>
        </header>
        <div className="flex flex-grow">
            <ChatSidebar users={users} />
            <ChatWindow />
        </div>
      </div>
    </>
  )
}

export default UserHomeScreen
