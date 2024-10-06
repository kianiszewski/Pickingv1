// src/components/GenerarQR.jsx

import React, { useState } from 'react';
import QRious from 'qrious';
import { Card, Button, Form, Col, Row, Container, Alert } from 'react-bootstrap';

const GenerarQR = () => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateQR = () => {
    // Verifica que todos los campos estén llenos
    if (!codigo || !descripcion || !cantidad || !ubicacion) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Resetea el mensaje de error
    setError('');

    const qr = new QRious({
      value: `Código: ${codigo}, Descripción: ${descripcion}, Cantidad: ${cantidad}, Ubicación: ${ubicacion}`,
      size: 300,
    });
    setQrImage(qr.toDataURL());
    
    // Limpiar el formulario
    setCodigo('');
    setDescripcion('');
    setCantidad('');
    setUbicacion('');
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formCodigo">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUbicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleGenerateQR}>
              Generar QR
            </Button>
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          </Form>
        </Col>
        <Col md={6}>
          {qrImage && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Código QR Generado</Card.Title>
                <img src={qrImage} alt="Código QR" />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GenerarQR;
