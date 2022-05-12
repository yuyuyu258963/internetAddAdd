import React from 'react';
import Loading from './View/Loading';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import TestDemo from './View/TestDemo';


function App() {
  return (
    <>
    <Routes >
      <Route path="*" element={<Loading/>} />
      <Route path="/loading/*" element={<Loading/>} />
      <Route path="/test" element={<TestDemo />} />
    </Routes>
    </>
  );
}

export default App;
