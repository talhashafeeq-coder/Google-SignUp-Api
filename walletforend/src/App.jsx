import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Expense from './Components/Expense';
import Income from './Components/Income';
import Home from './Components/Home';
import MoreDetail from './Components/MoreDetail';
import SignUp from './Components/Signup';
import SignIn from './Components/Sigin';
import SaveToken from './Components/savetoken';

function App() {
  return (
    <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/" element={<Home />} />
        <Route path='/income' element={<Income />} />
        <Route path="/expense" element={<Expense/>} />
        <Route path="/more" element={<MoreDetail/>} />
        <Route path="/savetoken/:token" element={<SaveToken />} />

      </Routes>
  );
}

export default App;
