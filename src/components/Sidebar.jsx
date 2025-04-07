import { useState } from "react";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Redirige al login
  };

  return (
    <>
      <span variant="primary" onClick={handleShow} className="m-2" style={{ cursor: "pointer", fontSize: "20px" }}>
        ☰
      </span>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link>
            <Nav.Link onClick={() => navigate("/administration")}>Administración</Nav.Link>
            <Nav.Link href="#">Perfil</Nav.Link>
            <Nav.Link href="#">Configuración</Nav.Link>
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
