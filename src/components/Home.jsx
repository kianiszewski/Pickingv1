import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Barcode from 'react-barcode';

const Home = ({ setTrabajos }) => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [referencia, setReferencia] = useState('');

  // Contador para el ID
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    // Aquí puedes cargar los trabajos almacenados y calcular el próximo ID
    const storedTrabajos = JSON.parse(localStorage.getItem('trabajos')) || [];
    if (storedTrabajos.length > 0) {
      const lastId = storedTrabajos[storedTrabajos.length - 1].id;
      setNextId(lastId + 1);
    }
  }, []);

  const handleRegistrar = () => {
    if (codigo && descripcion && cantidad && referencia) {
      const newTrabajo = {
        id: nextId, // Asigna el ID correlativo
        codigo,
        descripcion,
        cantidad,
        referencia,
      };

      // Actualiza la lista de trabajos
      setTrabajos((prev) => [...prev, newTrabajo]);

      // Guarda en localStorage
      const updatedTrabajos = [...(JSON.parse(localStorage.getItem('trabajos')) || []), newTrabajo];
      localStorage.setItem('trabajos', JSON.stringify(updatedTrabajos));

      // Limpiar los campos
      setCodigo('');
      setDescripcion('');
      setCantidad('');
      setReferencia('');
      setNextId(nextId + 1); // Incrementa el contador de ID
      
      // Muestra la alerta con el ID
      alert(`Trabajo con ID: ${newTrabajo.id} ha sido registrado`);
    }
  };

  // Manejar el evento de tecla
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Previene el comportamiento predeterminado
      handleRegistrar(); // Llama a la función para registrar
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Trabajo</h2>
      <Form>
        <Form.Group controlId="formCodigo">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingrese el código"
            autoFocus
            onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
          />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese la descripción"
            onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
          />
        </Form.Group>
        <Form.Group controlId="formCantidad">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ingrese la cantidad"
            onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
          />
        </Form.Group>
        <Form.Group controlId="formReferencia">
          <Form.Label>Referencia</Form.Label>
          <Form.Control
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Ingrese la referencia"
            onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleRegistrar}>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default Home;
