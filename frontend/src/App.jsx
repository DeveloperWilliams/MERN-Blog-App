import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './authFolder/Login'
import Signup from './authFolder/Signup'
import Forgot from './authFolder/Forgot'
import Reset from './authFolder/Reset'
import Verify from './authFolder/verify'
import Home from './homeFolder/Home'
import Create from './blogFolder/Create'
import NotVerified from './authFolder/NotVerified'
import HomeBlog from './blogFolder/homeBlog/homeBlog'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgot-password' element={<Forgot/>}></Route>
      <Route path='/reset-password/:token' element={<Reset/>}></Route>
      <Route path='/verify/:token' element={<Verify/>}></Route>
      <Route path='/create-blog/:id' element={<Create/>}></Route>
      <Route path='/not-verified' element={<NotVerified/>}></Route>
      <Route path='/home' element={<HomeBlog/>}></Route>
    </Routes>
  )
}

export default App