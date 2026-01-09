import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../constants/apis";

const useLogin = () => {
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const { emailId, password } = data;
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      localStorage.setItem("isAuthenticated", "true");
      return true;
    },
  });

  return loginMutation;
};

export { useLogin };
