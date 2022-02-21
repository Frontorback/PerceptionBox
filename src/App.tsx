import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Detail from './Pages/Detail';
import Home from './Pages/Home';
import Liked from './Pages/Liked';

function App() {
  return (
      <div>
        <BrowserRouter>
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Liked">Liked characters</NavLink>
          </div>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Detail' element={<Detail />}/>
              <Route path='/Liked' element={<Liked />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
