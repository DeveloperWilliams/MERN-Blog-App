import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './login/Login'
import Signup from './signup/Signup'
import Forgot from './forgot/Forgot'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/reset-password' element={<Forgot/>}></Route>
    </Routes>
  )
}

export default App