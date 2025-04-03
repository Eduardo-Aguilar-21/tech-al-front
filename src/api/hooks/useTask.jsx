import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as taskService from "../services/taskService"

// Get all tasks
export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ["tasks"], 
        queryFn: () => taskService.getAllTasks
    });
};

// Get a task by ID
export const useGetTaskById = (id) => {
    return useQuery({
        queryKey: ["task", id], 
        queryFn: () => taskService.getTaskById(id),
        enabled: !!id 
    });
};

// Get tasks assigned to a user
export const useFindByAssignedUserId = (userId) => {
    return useQuery({
        queryKey: ["tasks", "assigned", userId], 
        queryFn: () => taskService.findByAssignedUserId(userId),
        enabled: !!userId 
    });
};

// Get tasks assigned to a user with pagination
export const useFindByAssignedUserIdPaged = (userId, page = 0, size = 10) => {
    return useQuery({
        queryKey: ["assignedTasks", userId, page, size], 
        queryFn: () => taskService.findByAssignedUserIdPaged(userId, page, size),
        enabled: !!userId, 
    });
};

// Get tasks created by a user with pagination
export const useFindByCreatedByIdPaged = (userId, page = 0, size = 10) => {
    return useQuery({
        queryKey: ["createdTasks", userId, page, size],
        queryFn: () => taskService.findByCreatedByIdPaged(userId, page, size),
        enabled: !!userId,
    });
};

// Get unassigned tasks by group ID with pagination
export const useFindUnassignedTasksByGroupId = (groupId, page = 0, size = 10) => {
    return useQuery({
        queryKey: ["unassignedTasks", groupId, page, size],
        queryFn: () => taskService.findUnassignedTasksByGroupId(groupId, page, size),
        enabled: !!groupId,
    });
};

// Mutation to save a new task
export const useSaveTask = () => { 
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (task) => taskService.saveTask(task), 
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            queryClient.invalidateQueries(["task"]);
            queryClient.invalidateQueries(["tasks", "assigned"]);
            queryClient.invalidateQueries(["assignedTasks"]);
            queryClient.invalidateQueries(["createdTasks"]); 
            queryClient.invalidateQueries(["unassignedTasks"]); 
        }
    });
};
// Mutation to update a task
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, task }) => taskService.updateTask(id, task),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            queryClient.invalidateQueries(["task"]);
            queryClient.invalidateQueries(["tasks", "assigned"]);
            queryClient.invalidateQueries(["assignedTasks"]);
            queryClient.invalidateQueries(["createdTasks"]); 
            queryClient.invalidateQueries(["unassignedTasks"]); 
        }
    });
};

// Mutation to delete a task
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: taskService.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            queryClient.invalidateQueries(["task"]);
            queryClient.invalidateQueries(["tasks", "assigned"]);
            queryClient.invalidateQueries(["assignedTasks"]);
            queryClient.invalidateQueries(["createdTasks"]); 
            queryClient.invalidateQueries(["unassignedTasks"]); 
        }
    });
};