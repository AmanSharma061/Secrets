import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/shared/Home'
import Footer from './components/shared/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/shared/AuthForm'
import Not_Found from './components/shared/Not_Found'
import ResetPassword from './components/shared/ResetPassword'
import ForgotPassword from './components/shared/ForgotPassword'

function App () {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<AuthForm />} />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Not_Found/>} />

        </Routes>
      </div>
    </>
  )
}

export default App
