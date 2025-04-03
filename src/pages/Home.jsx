import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Sidebar from "../components/Sidebar";
import { Navbar } from "react-bootstrap";

//import { getTasks } from "../api/taskService";
import NavbarComponent from './../components/Navbar';

const Home = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  
  return (
    <div className="flex h-screen">
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <NavbarComponent />
        <main className="p-6">
          <h1 className="text-2xl font-bold">Bienvenido, {user?.name || "Usuario"} 👋</h1>

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
        </main>
      </div>
    </div>
  );
};

export default Home;
