import api from "../axiosConfig";

const endpoint = "/groups";

export const getAllGroups = async () => {
    const response = await api.get(endpoint);
    return response.data;
}
export const getGroupById = async (id) => {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
};

export const getGroupsByOrganizationId = async (organizationId) => {
    const response = await api.get(`${endpoint}/organization/${organizationId}`);
    return response.data;
}

export const getGroupsByOrganizationIdPage = async (organizationId, page, size) => {
    const response = await api.get(`${endpoint}/organization-page/${organizationId}?page=${page}&size=${size}`);
    return response.data;
}

export const saveGroup = async (group) => {
    const response = await api.post(endpoint, group);
    return response.data;
}
export const updateGroup = async (group) => {
    const response = await api.put(`${endpoint}/${group.id}`, group);
    return response.data;
};

export const deleteGroup = async (id) => {
    await api.delete(`${endpoint}/${id}`);
};