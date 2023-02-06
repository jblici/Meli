import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav";
import Products from "./components/Products";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Nav />}/>
      <Route path="/items" element={<Products/>}/>
      <Route path="/items/:id" element={<CardDetails />}/>
    </Routes>
    </div>
  );
}

export default App;
