import api from "../axiosConfig";

const endpoint = "/users";

export const getAllUsers = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const findByUsername = async (username) => {
  try {
    const response = await api.get(`${endpoint}/by-username`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al buscar usuario:", error.response?.data || error.message);
    return null;
  }
};

export const findByEmail = async (email) => {
  const response = await api.get(`${endpoint}/by-email`, {
    params: { email },
  });
  return response.data;
};

export const findByOrganization = async (organizationId) => {
  const response = await api.get(`${endpoint}/by-organization`, {
    params: { organizationId },
  });
  return response.data;
};

export const findByGroup = async (groupId) => {
  const response = await api.get(`${endpoint}/by-group`, {
    params: { groupId },
  });
  return response.data;
};

export const findByRole = async (role) => {
  const response = await api.get(`${endpoint}/by-role`, {
    params: { role },
  });
  return response.data;
};

export const findByStatus = async (status) => {
  const response = await api.get(`${endpoint}/by-status`, {
    params: { status },
  });
  return response.data;
};

export const saveUser = async (user) => {
  const response = await api.post(endpoint, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`${endpoint}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`${endpoint}/${id}`);
};
