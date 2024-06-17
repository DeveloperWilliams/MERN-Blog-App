import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './authFolder/Login'
import Signup from './authFolder/Signup'
import Forgot from './authFolder/Forgot'
import Reset from './authFolder/Reset'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgot-password' element={<Forgot/>}></Route>
      <Route path='/reset-password' element={<Reset/>}></Route>
    </Routes>
  )
}

export default App