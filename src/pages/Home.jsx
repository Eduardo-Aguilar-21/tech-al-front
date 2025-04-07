import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button, Modal, Navbar, Form } from "react-bootstrap";

//import { getTasks } from "../api/taskService";
import NavbarComponent from "./../components/Navbar";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useGetAllGroups, useGetGroupsByOrganizationId } from "../api/hooks/useGroup";
import { useFindByGroup, useFindByOrganization } from "../api/hooks/useUser";
import { useGetTaskPriorities, useSaveTask } from "../api/hooks/useTask";
import { saveTask } from "./../api/services/taskService";
import { showErrorAlert, showSuccessAlert } from "../utils/alertMessages";

const Home = () => {
  const { user } = useAuth();
  const userId = localStorage.getItem("userId");
  const organizationId = localStorage.getItem("organizationId");
  const { data: groups, isLoading, error } = useGetGroupsByOrganizationId(organizationId);
  const [tasks, setTasks] = useState([]);

  const { mutate: saveTask } = useSaveTask();

  const [showModal, setShowModal] = useState(false);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    groupSelected: "",
    userAssigned: "",
    priority: "LOW",
  });

  const { data: usersByGroup, isLoadingUsers } = useFindByGroup(taskData.groupSelected);
  const { data: priorities, isLoading: isLoadingPriorities } = useGetTaskPriorities();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setTaskData({
      title: "",
      description: "",
      groupSelected: "",
      userAssigned: "",
      priority: "LOW",
    });
  };

  const handleCreateTask = () => {
    if (!taskData.title.trim()) {
      alert("⚠️ El título de la tarea es obligatorio.");
      return;
    }

    const requestData = {
      title: taskData.title,
      description: taskData.description,
      group: {
        id: taskData.groupSelected,
      },
      assignedUser: taskData.userAssigned ? { id: taskData.userAssigned } : null, 
      createdBy: {
        id: userId,
      },
      priority: taskData.priority,
      status: "OPEN",
    };

    console.log("Tarea creada:", requestData);

    saveTask(requestData, {
      onSuccess: () => {
        showSuccessAlert("EXITO", "✅ Tarea creada con éxito.");
        handleCloseModal();
      },
      onError: (error) => {
        console.error("Error al crear la tarea:", error);
        showErrorAlert("Error", "❌ Error al crear la tarea. Por favor, inténtelo de nuevo.");
      },
    });

    handleCloseModal();
  };

  return (
    <div className="flex h-screen">
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <NavbarComponent />
        <main className="p-6">
          <h1 className="text-2xl font-bold">Bienvenido, {user?.name || "Usuario"} 👋</h1>

          <p className="mt-2 text-gray-600">Crear una tarea</p>
          <Button variant="success" className="mt-2" onClick={handleShowModal}>
            <CiCirclePlus size={30} className="mx-2" /> Crear tarea
          </Button>

          {/* Lista de tareas */}
          <div className="mt-4">
            {tasks.length > 0 ? (
              <ul className="list-disc pl-5">
                {tasks.map((task) => (
                  <li key={task.id} className="text-gray-800">
                    {task.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tienes tareas pendientes.</p>
            )}
          </div>

          {/* Botón para gestionar tareas */}
          <Link to="/tasks" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Ver tareas
          </Link>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Crear nueva tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="taskTitle">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el título"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="taskDescription" className="mt-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingrese una descripción (opcional)"
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="taskGroup" className="mt-3">
                  <Form.Label>Grupo</Form.Label>
                  <Form.Select
                    value={taskData.groupSelected || ""} // Si es null, lo sustituimos por una cadena vacía
                    onChange={(e) => setTaskData({ ...taskData, groupSelected: e.target.value })}
                    disabled={isLoading}
                  >
                    <option value="">Seleccione un grupo</option>
                    {groups?.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Form.Select>
                  {error && <div className="text-danger mt-2">Error al cargar grupos.</div>}
                  <small className="text-muted mt-2 d-block">Si no selecciona un grupo, la tarea se creará como "Tarea libre".</small>
                </Form.Group>

                {taskData.groupSelected && (
                  <Form.Group controlId="taskUser" className="mt-3">
                    <Form.Label>Usuario asignado</Form.Label>
                    <Form.Select
                      value={taskData.userAssigned || ""}
                      onChange={(e) => setTaskData({ ...taskData, userAssigned: e.target.value })}
                      disabled={isLoadingUsers}
                    >
                      <option value="">Seleccione un usuario</option>
                      {usersByGroup?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} {user.lastName}
                        </option>
                      ))}
                    </Form.Select>
                    {isLoadingUsers && <div>Cargando usuarios...</div>}
                  </Form.Group>
                )}

                <Form.Group controlId="taskPriority" className="mt-3">
                  <Form.Label>Prioridad</Form.Label>
                  <Form.Select
                    value={taskData.priority || ""}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value || "LOW"})}
                    disabled={isLoadingPriorities}
                  >
                    {!isLoadingPriorities &&
                      priorities?.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                  </Form.Select>
                  {isLoadingPriorities && <div>Cargando prioridades...</div>}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleCreateTask}>
                Crear tarea
              </Button>
            </Modal.Footer>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default Home;
