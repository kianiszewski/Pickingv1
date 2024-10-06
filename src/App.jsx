import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaTrabajo from './components/ListaTrabajo';
import TrabajosTerminados from './components/TrabajosTerminados';
import GenerarQR from './components/GenerarQR'; // Asegúrate de importar GenerarQR
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
        <Route 
          path="/generar-qr" 
          element={<GenerarQR />} // Asegúrate de agregar esta línea
        />
      </Routes>
    </Router>
  );
};

export default App;
