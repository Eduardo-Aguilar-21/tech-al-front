import React from "react";
import NavbarComponent from "../../components/Navbar";
import CustomCard from "../../components/CustomCard";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Administration = () => {

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column h-100">
      {/* Navbar */}
      <NavbarComponent />

      {/* Contenido principal */}
      <main className="p-4">
        <h1 className="text-center mb-4">Administración</h1>
        <p className="text-center mb-6">Esta es la página de administración.</p>

        {/* Contenedor de Cards Centrados */}
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4} className="mb-4">
              <CustomCard
                title="ORGANIZACIÓN"
                text="Este es un ejemplo de tarjeta reutilizable."
                buttonText="Ver más"
                onButtonClick={() => navigate("/organization")}
              />
            </Col>

            <Col xs={12} md={6} lg={4} className="mb-4">
              <CustomCard
                title="Tarjeta de Ejemplo 2"
                text="Este es un ejemplo de tarjeta reutilizable."
                buttonText="Ver más"
                onButtonClick={() => alert("Botón presionado")}
              />
            </Col>

            <Col xs={12} md={6} lg={4} className="mb-4">
              <CustomCard
                title="Tarjeta de Ejemplo 3"
                text="Este es un ejemplo de tarjeta reutilizable."
                buttonText="Ver más"
                onButtonClick={() => alert("Botón presionado")}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Administration;
