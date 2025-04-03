import React, { useState } from "react";
import NavbarComponent from "../../components/Navbar";
import { useGetAllOrganizations } from "../../api/hooks/useOrganization";
import { useSaveOrganization } from "../../api/hooks/useOrganization";
import { useDeleteOrganization } from "../../api/hooks/useOrganization";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../utils/alertMessages";

const Organization = () => {
  const { data: organizations, isLoading, error } = useGetAllOrganizations();
  const { mutate: saveOrganization } = useSaveOrganization();
  const { mutate: deleteOrganization } = useDeleteOrganization();

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [organizationName, setOrganizationName] = useState(""); 

  // Manejo de apertura y cierre del modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Manejo del formulario para guardar la organización
  const handleSaveOrganization = () => {
    const newOrganization = {
      name: organizationName,
    };

    saveOrganization(newOrganization, {
      onSuccess: () => {
        handleCloseModal();
        setOrganizationName("");
        showSuccessAlert("Success!", "Organization added successfully.");
      },
      onError: (error) => {
        console.error("Error saving organization:", error);
        showErrorAlert("Error!", "There was an issue adding the organization.");
      },
    });
  };

  const handleDelete = (id) => {
    showWarningAlert(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!",
      "No, keep it"
    ).then((result) => {
      if (result.isConfirmed) {
        deleteOrganization(id, {
          onSuccess: () => {
            showSuccessAlert("Deleted!", "Organization has been deleted.");
          },
          onError: (error) => {
            console.error("Error deleting organization:", error);
            showErrorAlert("Error!", "There was an issue deleting the organization.");
          },
        });
      }
    });
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading organizations</p>;

  return (
    <div className="d-flex flex-column h-100">
      {/* Navbar */}
      <NavbarComponent />

      <main className="p-4">
        <h1 className="text-center mb-4">Organizations</h1>

        {/* Botón para agregar una organización */}
        <Button variant="success" onClick={handleShowModal} className="mb-4">
          Add Organization
        </Button>

        {/* Tabla de organizaciones */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations?.map((organization, index) => (
              <tr key={organization.id}>
                <td>{index + 1}</td>
                <td>{organization.name}</td>
                <td>
                  {/* Botones de acción (editar, eliminar) */}
                  <Button variant="info" className="mr-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(organization.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>

      {/* Modal para agregar una nueva organización */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="organizationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveOrganization}>
            Save Organization
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Organization;
