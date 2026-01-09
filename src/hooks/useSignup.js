import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../constants/apis";

const useSignup = () => {
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const { firstName, lastName, emailId, password } = data;
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailId,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      return true;
    },
  });

  return signupMutation;
};

export { useSignup };
