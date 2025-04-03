import api from "../axiosConfig";

const endpoint = "/task";

export const getAllTasks = async() => {
    const response = await api.get(endpoint);
    return response.data
};

export const getTaskById = async (id) => {
    const response = await api.get(`/${endpoint}/${id}`);   
    return response.data;
};

export const findByAssignedUserId = async (userId) => {
    const response = await api.get(`${endpoint}/assigned/${userId}`);
    return response.data;
};

export const findByAssignedUserIdPaged = async (userId, page = 0, size = 10) => {
    const response = await api.get(`${endpoint}/assigned-page/${userId}`, {
        params: { page, size }
    });
    return response.data;
};

export const findByCreatedByIdPaged = async (userId, page = 0, size = 10) => {
    const response = await api.get(`${endpoint}/created-page/${userId}`, {
        params: { page, size }
    });
    return response.data;
};

export const findUnassignedTasksByGroupId = async (groupId, page = 0, size = 10) => {
    const response = await api.get(`${endpoint}/unassigned-page/${groupId}`, {
        params: { page, size }
    });
    return response.data;
};

export const saveTask = async (task) => {
    const response = await api.post(endpoint, task);
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.put(`${endpoint}/${id}`, task);
    return response.data;
};

export const assignTaskToUser = async (taskId, userId) => {
    const response = await api.put(`${endpoint}/${taskId}/assign/${userId}`);
    return response.data;
};

export const findByPriorityAndGroupId = async (taskPriority, groupId, page = 0, size = 10) => {
    const response = await api.get(`${endpoint}/priority-page/${taskPriority}`, {
        params: { groupId, page, size }
    });
    return response.data;
};

export const findByStatusAndGroupId = async (taskStatus, groupId, page = 0, size = 10) => {
    const response = await api.get(`${endpoint}/status-page/${taskStatus}`, {
        params: { groupId, page, size }
    });
    return response.data;
};

export const deleteTask = async (id) => {
    await api.delete(`${endpoint}/${id}`);
};