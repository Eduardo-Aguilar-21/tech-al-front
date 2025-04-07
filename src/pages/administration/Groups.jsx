import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table, Modal, Form } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";

import { useDeleteGroup, useGetAllGroups, useSaveGroup, useUpdateGroup } from "../../api/hooks/useGroup";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { showErrorAlert, showWarningAlert } from "../../utils/alertMessages";

const Groups = () => {
  const { id } = useParams();
  const { data: groups, isLoading, error } = useGetAllGroups();
  const { mutate: saveGroup } = useSaveGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setGroupName("");
    setSelectedGroup(null);
  };

  const handleSaveOrUpdateGroup = () => {
    if (!groupName.trim()) {
      showErrorAlert("Validation Error", "The group name cannot be empty.");
      return;
    }

    const payload = {
      id: selectedGroup?.id,
      name: groupName,
      organization: {
        id: id,
      },
    };

    if (selectedGroup) {
      updateGroup(payload, {
        onSuccess: () => {
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Update error:", error);
          showErrorAlert("Error!", "Failed to update group.");
        },
      });
    } else {
      saveGroup(payload, {
        onSuccess: () => {
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Save error:", error);
          showErrorAlert("Error!", "Failed to save group.");
        },
      });
    }
  };

  const handleEdit = (group) => {
    setGroupName(group.name);
    setSelectedGroup(group);
    handleShowModal(true);
  };

  const handleDelete = (groupId) => {
    showWarningAlert("Are you sure?", "You won't be able to revert this!", "Yes, delete it!", "No, keep it").then((result) => {
      if (result.isConfirmed) {
        deleteGroup(groupId, {
          onSuccess: () => {
            handleCloseModal();
          },
          onError: (error) => {
            console.error("Delete error:", error);
            showErrorAlert("Error!", "Failed to delete group.");
          },
        });
      }
    });
  };

  return (
    <div className="d-flex flex-column h-100">
      <NavbarComponent />

      <main className="p-4">
        <h1 className="text-center mb-4">Groups</h1>
        <Button variant="success" onClick={handleShowModal} className="mb-4">
          <CiCirclePlus size={30} className="mx-2" /> Agregar Grupo
        </Button>

        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error al cargar los grupos.</p>
        ) : (
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.name}</td>
                  <td>
                    <Button variant="info" className="mx-2" onClick={() => alert("Botón presionado")}>
                      View users
                      <FaUsers size={16} className="mx-2" />
                    </Button>{" "}
                    <Button variant="warning" className="mx-2" onClick={() => handleEdit(group)}>
                      <FaEdit size={16} className="mx-2" />
                      Edit
                    </Button>{" "}
                    <Button variant="danger" className="mx-2" onClick={() => handleDelete(group.id)}>
                      <FaTrash size={16} className="mx-2" />
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal para agregar/editar grupo */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedGroup ? "Editar Grupo" : "Agregar Grupo"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formGroupName">
              <Form.Label>Nombre del Grupo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre del grupo" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            {selectedGroup ? (
              <Button
                variant="primary"
                onClick={() => {
                  updateGroup({ ...selectedGroup, name: groupName });
                  handleCloseModal();
                }}
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSaveOrUpdateGroup}>
                Agregar Grupo
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default Groups;
