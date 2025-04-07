import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";

import { useGetAllOrganizations, useSaveOrganization, useDeleteOrganization, useUpdateOrganization } from "../../api/hooks/useOrganization";

import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../utils/alertMessages";

import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const navigate = useNavigate();
  const { data: organizations, isLoading, error } = useGetAllOrganizations();
  const { mutate: saveOrganization } = useSaveOrganization();
  const { mutate: updateOrganization } = useUpdateOrganization();
  const { mutate: deleteOrganization } = useDeleteOrganization();

  const [showModal, setShowModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(null); // ⭐

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setOrganizationName("");
    setSelectedOrganization(null); // Reset
  };

  const handleSaveOrUpdateOrganization = () => {
    if (!organizationName.trim()) {
      showErrorAlert("Validation Error", "Organization name cannot be empty.");
      return;
    }

    const payload = {
      id: selectedOrganization?.id, 
      name: organizationName,
    };

    if (selectedOrganization) {
      updateOrganization(payload, {
        onSuccess: () => {
          showSuccessAlert("Updated!", "Organization updated successfully.");
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Update error:", error);
          showErrorAlert("Error!", "Failed to update organization.");
        },
      });
    } else {
      saveOrganization(
        { name: organizationName },
        {
          onSuccess: () => {
            showSuccessAlert("Success!", "Organization added successfully.");
            handleCloseModal();
          },
          onError: (error) => {
            console.error("Save error:", error);
            showErrorAlert("Error!", "Failed to add organization.");
          },
        }
      );
    }
  };

  const handleEdit = (organization) => {
    setSelectedOrganization(organization);
    setOrganizationName(organization.name);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    showWarningAlert("Are you sure?", "You won't be able to revert this!", "Yes, delete it!", "No, keep it").then((result) => {
      if (result.isConfirmed) {
        deleteOrganization(id, {
          onSuccess: () => {
            showSuccessAlert("Deleted!", "Organization has been deleted.");
          },
          onError: (error) => {
            console.error("Delete error:", error);
            showErrorAlert("Error!", "Failed to delete organization.");
          },
        });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading organizations</p>;

  return (
    <div className="d-flex flex-column h-100">
      <NavbarComponent />
      <main className="p-4">
        <h1 className="text-center mb-4">Organizations</h1>

        <Button variant="success" onClick={handleShowModal} className="mb-4">
          <CiCirclePlus size={30} className="mx-2" />
          Add Organization
        </Button>

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
                  <Button variant="info" className="mx-2" onClick={() => navigate(`/groups/${organization.id}`)}>
                    <FaUsers size={16} className="mx-2" />
                    View Groups
                  </Button>
                  <Button variant="warning" className="mx-2" style={{ margin: "0px 10px" }} onClick={() => handleEdit(organization)}>
                    <FaEdit size={16} className="mx-2" />
                    Edit
                  </Button>
                  <Button variant="danger" className="mx-2"  onClick={() => handleDelete(organization.id)}>
                    <FaTrash size={16} className="mx-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>

      {/* Modal de Crear/Editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrganization ? "Edit Organization" : "Add Organization"}</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveOrUpdateOrganization}>
            {selectedOrganization ? "Update" : "Save"} Organization
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Organization;
