import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';

const Protect = () => {
    const {userInfo} = useSelector(state=>state.userAuth)
  return (
    <>
      {
        userInfo ? <Outlet /> : <Navigate to='/' />
      }
    </>
  )
}

export default Protect
