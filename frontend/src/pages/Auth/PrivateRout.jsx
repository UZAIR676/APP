import React from 'react'
import { Navigate,Outlet } from 'react-router'
import { useSelector } from 'react-redux'
const PrivateRout = () => {
    const {userInfo} = useSelector((state)=>state.auth);

    return userInfo ? <Outlet/> : <Navigate to='/login'/>
  return (
    <div>
      
    </div>
  )
}

export default PrivateRout
