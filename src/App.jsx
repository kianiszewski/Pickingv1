import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaTrabajo from './components/ListaTrabajo';
import TrabajosTerminados from './components/TrabajosTerminados';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [trabajosTerminados, setTrabajosTerminados] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setTrabajos={setTrabajos} />} />
        <Route 
          path="/trabajos-registrados" 
          element={
            <ListaTrabajo 
              trabajos={trabajos} 
              setTrabajos={setTrabajos} 
              setTrabajosTerminados={setTrabajosTerminados} 
            />} 
        />
        <Route 
          path="/trabajos-terminados" 
          element={<TrabajosTerminados trabajosTerminados={trabajosTerminados} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
