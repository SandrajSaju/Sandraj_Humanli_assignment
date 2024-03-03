import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Public = () => {
    const {userInfo} = useSelector(state=>state.userAuth)
  return (
    <>
      {
        userInfo ? <Navigate to='/chat' /> : <Outlet />
      }
    </>
  )
}

export default Public
