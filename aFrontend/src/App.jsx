import React from 'react'
import Register from './Components/Register'
import {Toaster} from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Gallery from './Components/Gallery'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Register/>}/>
        <Route path='/gallery/:id' element={<Gallery/>}/>
      </Routes>
     
      <Toaster position='top-center'/>
    </div>
  )
}

export default App
