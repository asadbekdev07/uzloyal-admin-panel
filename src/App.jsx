import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import News from "./pages/News.jsx"
import Blogs from "./pages/Blogs.jsx"
import Login from './pages/Login.jsx'

function App() {

  return (
    <div className="container-custom">
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/news' element={<News />}/>
          <Route path='/blogs' element={<Blogs />}/>
        </Routes>
      </BrowserRouter> */}
      <Login />
    </div>
  )
}

export default App
