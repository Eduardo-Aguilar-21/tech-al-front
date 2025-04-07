import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as groupService from "../services/groupService";

export const useGetAllGroups = () => {
    return useQuery({
        queryKey: ["groups"],
        queryFn: () => groupService.getAllGroups()
    });
}  

export const useGetGroupById = (id) => {
    return useQuery({
        queryKey: ["group", id],
        queryFn: () => groupService.getGroupById(id),
        enabled: !!id
    });
};

export const useGetGroupsByOrganizationId = (organizationId) => {
    return useQuery({
        queryKey: ["groups", organizationId],
        queryFn: () => groupService.getGroupsByOrganizationId(organizationId),
        enabled: !!organizationId
    });
};
export const useGetGroupsByOrganizationIdPage = (organizationId, page, size) => {
    return useQuery({
        queryKey: ["groups", organizationId, page, size],
        queryFn: () => groupService.getGroupsByOrganizationIdPage(organizationId, page, size),
        enabled: !!organizationId
    });
};

export const useSaveGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (group) => groupService.saveGroup(group),
        onSuccess: () => {
            queryClient.invalidateQueries(["groups"]);
        },
    });
};

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (group) => groupService.updateGroup(group),
        onSuccess: (group) => {
            queryClient.invalidateQueries(["groups"]);
            queryClient.invalidateQueries(["group", group.id]);
        },
    });
};

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => groupService.deleteGroup(id),
        onSuccess: (id) => {
            queryClient.invalidateQueries(["groups"]);
            queryClient.invalidateQueries(["group", id]);
        },
    });
};