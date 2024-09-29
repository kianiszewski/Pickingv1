import React from 'react';
import { Card } from 'react-bootstrap';
import Barcode from 'react-barcode';

const TrabajosTerminados = ({ trabajosTerminados }) => {
  return (
    <div className="container mt-4">
      <h2>Trabajos Terminados</h2>
      {trabajosTerminados.length === 0 ? (
        <h3>No hay trabajos terminados.</h3>
      ) : (
        trabajosTerminados.map((trabajo) => (
          <Card key={trabajo.id} className="mb-3">
            <Card.Body>
              <Card.Title>Trabajo Finalizado</Card.Title>
              <Card.Text>
                <strong>ID del Trabajo:</strong> {trabajo.id}<br />
                <strong>Código:</strong>
                <div>
                  <Barcode value={trabajo.codigo} format="CODE128" />
                </div>
                <strong>Descripción:</strong> {trabajo.descripcion}<br />
                <strong>Cantidad:</strong> {trabajo.cantidad}<br />
                <strong>Referencia:</strong>
                <div>
                  <Barcode value={trabajo.referencia} format="CODE128" />
                </div>
                <strong>Fecha de Finalización:</strong> {trabajo.fechaFinalizacion}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TrabajosTerminados;
