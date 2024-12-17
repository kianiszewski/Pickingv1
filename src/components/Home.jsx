import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx'; // Importar XLSX

const Home = ({ setTrabajos }) => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [referencia, setReferencia] = useState('');
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const storedTrabajos = JSON.parse(localStorage.getItem('trabajos')) || [];
    if (storedTrabajos.length > 0) {
      const lastId = storedTrabajos[storedTrabajos.length - 1].id;
      setNextId(lastId + 1);
    }
  }, []);

  const handleRegistrar = () => {
    if (codigo && descripcion && cantidad && referencia) {
      const newTrabajo = {
        id: nextId,
        codigo,
        descripcion,
        cantidad,
        referencia,
      };
      setTrabajos((prev) => [...prev, newTrabajo]);

      const updatedTrabajos = [...(JSON.parse(localStorage.getItem('trabajos')) || []), newTrabajo];
      localStorage.setItem('trabajos', JSON.stringify(updatedTrabajos));

      setCodigo('');
      setDescripcion('');
      setCantidad('');
      setReferencia('');
      setNextId(nextId + 1);
      alert(`Trabajo con ID: ${newTrabajo.id} ha sido registrado`);
    }
  };

  // Procesar archivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Convertir y agregar datos al estado
      const trabajosFromExcel = jsonData.map((row, index) => ({
        id: nextId + index,
        codigo: row.Código || '',
        descripcion: row.Descripción || '',
        cantidad: row.Cantidad || 0,
        referencia: row.Referencia || '',
      }));

      setTrabajos((prev) => [...prev, ...trabajosFromExcel]);
      setNextId(nextId + trabajosFromExcel.length);

      alert('Datos del archivo Excel cargados correctamente.');
    };

    if (file) reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Trabajo</h2>
      <Form>
        <Form.Group controlId="formFile">
          <Form.Label>Subir Archivo Excel</Form.Label>
          <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </Form.Group>
        <br />
        <Form.Group controlId="formCodigo">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingrese el código"
          />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese la descripción"
          />
        </Form.Group>
        <Form.Group controlId="formCantidad">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ingrese la cantidad"
          />
        </Form.Group>
        <Form.Group controlId="formReferencia">
          <Form.Label>Referencia</Form.Label>
          <Form.Control
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Ingrese la referencia"
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
