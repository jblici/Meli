import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav";
import Cards from "./components/Cards";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Nav />}/>
      <Route exact path="/items" element={<Cards/>}/>
      <Route exact path="/items/:id" element={<CardDetails />}/>
    </Routes>
    </div>
  );
}

export default App;
