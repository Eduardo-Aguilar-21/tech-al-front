import api from "../axiosConfig";

const endpoint = "/organizations";

export const getAllOrganizations = async () => {
    const response = await api.get(endpoint);
    return response.data;
};

export const getOrganizationById = async (id) => {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
};

export const saveOrganization = async (organization) => {
    const response = await api.post(endpoint, organization);
    return response.data;
}

export const updateOrganization = async (id, organization) => {
    const response = await api.put(`${endpoint}/${id}`, organization);
    return response.data;
}

export const deleteOrganization = async (id) => {
   await api.delete(`${endpoint}/${id}`);
}