import React, { useState } from 'react';
import { Carousel, Button, Card, Col } from 'react-bootstrap';
import Barcode from 'react-barcode';

const ListaTrabajo = ({ trabajos, setTrabajos, setTrabajosTerminados }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextJobId, setNextJobId] = useState(trabajos.length > 0 ? trabajos[trabajos.length - 1].id + 1 : 1); // Start from last ID + 1

  const handleFinalizar = () => {
    const trabajoFinalizado = {
      ...trabajos[currentIndex],
      fechaFinalizacion: new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    };

    setTrabajosTerminados((prev) => [...prev, trabajoFinalizado]);
    setTrabajos((prev) => prev.filter((_, index) => index !== currentIndex));

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    // Auto-reset the ID counter if all jobs are done
    if (trabajos.length === 1) {
      setNextJobId(1);
    }
  };

  const handleResetId = () => {
    setNextJobId(1);
  };

  const handleAddJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: nextJobId,
    };
    setTrabajos((prev) => [...prev, jobWithId]);
    setNextJobId(nextJobId + 1); // Increment the ID for the next job
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? trabajos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === trabajos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container mt-4">
      {trabajos.length === 0 ? (
        <h3>No hay trabajos registrados.</h3>
      ) : (
        <div>
          <Carousel activeIndex={currentIndex} controls={false}>
            {trabajos.map((trabajo, index) => (
              <Carousel.Item key={trabajo.id}>
                <Card className="text-center trabajo-card d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>{trabajo.descripcion}</Card.Title>
                    <Card.Text>
                      <strong>Código:</strong>
                      <div>
                        <Barcode value={trabajo.codigo} format="CODE128" />
                      </div>
                      <strong>Referencia:</strong>
                      <div>
                        <Barcode value={trabajo.referencia} format="CODE128" />
                      </div>
                      <strong>ID:</strong> {trabajo.id}<br />
                      <strong>Fecha de Finalización:</strong> {trabajo.fechaFinalizacion}
                    </Card.Text>

                    <Col md={3} className="d-flex flex-column align-items-center justify-content-center">
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>Cantidad</p>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
                          {trabajo.cantidad}
                        </div>
                      </div>
                    </Col>

                    <Button variant="success" onClick={handleFinalizar}>
                      Finalizar Trabajo
                    </Button>
                  </Card.Body>
                </Card>
                <br />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="mt-3 d-flex justify-content-center">
            <Button variant="primary" onClick={handlePrev} disabled={trabajos.length <= 1}>
              Anterior
            </Button>
            <Button variant="primary" onClick={handleNext} disabled={trabajos.length <= 1}>
              Siguiente
            </Button>
          </div>

          {/* Mostrar la cantidad total de trabajos */}
          <div className="mt-3 d-flex justify-content-center">
            <h5>Total de trabajos registrados: {trabajos.length}</h5>
          </div>

          {/* Reset ID counter button */}
          <div className="mt-3 d-flex justify-content-center">
            <Button variant="danger" onClick={handleResetId}>
              Resetear ID de Trabajos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaTrabajo;
