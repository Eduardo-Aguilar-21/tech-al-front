import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "../services/userService";

// Get a list of all users
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers,
  });
};

// Get a user by ID
export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

// Get a user by username
export const useFindByUsername = (username) => {
  return useQuery({
    queryKey: ["username", username],
    queryFn: () => userService.findByUsername(username),
    enabled: !!username,
  });
};

// Get a user by email
export const useFindByEmail = (email) => {
  return useQuery({
    queryKey: ["email", email],
    queryFn: () => userService.findByEmail(email),
    enabled: !!email,
  });
};

// Get a user by organization ID
export const useFindByOrganization = (organizationId) => {
  return useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => userService.findByOrganization(organizationId),
    enabled: !!organizationId,
  });
};

// Get a user by group ID
export const useFindByGroup = (groupId) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => userService.findByGroup(groupId),
    enabled: !!groupId,
  });
};

// Get a user by role
export const useFindRole = (role) => {
  return useQuery({
    queryKey: ["role", role],
    queryFn: () => userService.findByRole(role),
    enabled: !!role,
  });
};

// Get a user by status
export const useFindStatus = (status) => {
  return useQuery({
    queryKey: ["status", status],
    queryFn: () => userService.findByStatus(status),
    enabled: !!status,
  });
};

// Mutation to save a new user
export const useSaveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => userService.saveUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["username"]);
      queryClient.invalidateQueries(["email"]);
      queryClient.invalidateQueries(["organization"]);
      queryClient.invalidateQueries(["group"]);
      queryClient.invalidateQueries(["role"]);
      queryClient.invalidateQueries(["status"]);
    },
  });
};

// Mutation to update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }) => userService.updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["username"]);
      queryClient.invalidateQueries(["email"]);
      queryClient.invalidateQueries(["organization"]);
      queryClient.invalidateQueries(["group"]);
      queryClient.invalidateQueries(["role"]);
      queryClient.invalidateQueries(["status"]);
    },
  });
};

// Mutation to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["username"]);
      queryClient.invalidateQueries(["email"]);
      queryClient.invalidateQueries(["organization"]);
      queryClient.invalidateQueries(["group"]);
      queryClient.invalidateQueries(["role"]);
      queryClient.invalidateQueries(["status"]);
    },
  });
};
