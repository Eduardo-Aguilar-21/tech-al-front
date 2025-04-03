import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { useFindByUsername } from "../api/hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const username = localStorage.getItem("username");
  const { data: user, isLoading, isError } = useFindByUsername(username);
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Sidebar />
          <Navbar.Brand href="#">Mi Aplicación</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link>
              <Nav.Link onClick={() => navigate("/administration")}>Administracion</Nav.Link>
              <Nav.Link href="#">V</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">Perfil</Nav.Link>
            <Nav.Link href="#">Configuración</Nav.Link>
            <Nav.Link href="#">Cerrar sesión</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
