import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useFetchBoardsQuery = () => {
  const fetchBoards = async () => {
    const response = await fetch(`${API_BASE}/boards`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });
};
//
