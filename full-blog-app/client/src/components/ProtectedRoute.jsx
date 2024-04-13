import React, { useContext } from 'react'
import { authentication } from '../context'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const access = useContext(authentication)
  
  return access.auth ? <Outlet/>: <Navigate to="/"/>

}
