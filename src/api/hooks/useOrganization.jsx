import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as organizationService from "../services/organizationService"

export const useGetAllOrganizations = () => {
    return useQuery({
        queryKey: ["organizations"], 
        queryFn: () => organizationService.getAllOrganizations()
    });
};

export const useGetOrganizationById = (id) => {
    return useQuery({
        queryKey: ["organization", id], 
        queryFn: () => organizationService.getOrganizationById(id),
        enabled: !!id 
    });
};

export const useSaveOrganization = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (organization) => organizationService.saveOrganization(organization),
        onSuccess: () => {
            queryClient.invalidateQueries(["organizations"]);
        },
    });
};

export const useUpdateOrganization = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (organization) => organizationService.updateOrganization(organization),
        onSuccess: (organization) => {
            queryClient.invalidateQueries(["organizations"]);
            queryClient.invalidateQueries(["organization", organization.id]);
        },
    });
};

// Eliminar organización
export const useDeleteOrganization = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (id) => organizationService.deleteOrganization(id),
        onSuccess: (id) => {
            queryClient.invalidateQueries(["organizations"]);
            queryClient.invalidateQueries(["organization", id]);
        },
    });
};