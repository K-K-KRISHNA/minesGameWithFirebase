import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/HomePage/Home'
import Game from '../Pages/GamePage/Game'
import NotFound from '../Pages/NotFound/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/game' element={<Game />}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default AppRoutes