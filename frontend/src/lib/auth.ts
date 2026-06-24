export const getRole = () => localStorage.getItem("role") || "admin";

export const setRole = (role: string) =>
  localStorage.setItem("role", role);