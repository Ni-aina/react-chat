import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Home } from '../components/home';
import { Register } from '../components/register';
import { Login } from '../components/login';
import { Chat } from '../components/chat';

const App = props => {
  const {items, saveToLocalStorage} = props;
  const isAuth = useSelector(state => state.items);
  const authFails = isAuth.length===0? false : isAuth[0].isAuth===true? true : false;
  useEffect(()=>{
    saveToLocalStorage(items);
  }, [saveToLocalStorage, items]);
  return(
    <>
      <Router>
        <Navbar authFails={authFails}/>
        <Routes>
          <Route path="/" element={authFails ? <Navigate to="/chat"/> : <Home />}></Route>
          <Route path="/react-chat" element={authFails ? <Navigate to="/chat"/> : <Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login authFails={authFails}/>}></Route>
          <Route path="/chat" element={<Chat authFails={authFails}/>}></Route>
        </Routes>
        <div className={`${authFails && 'd-none'}`}
          style={{ background: "#222", color: "#ddd", padding: "15px", height: "30px", textAlign: "center" }}>
          &copy; Copyright 2022 by Nï Aina
        </div>    
      </Router>
    </>
  )
}

export default App;
