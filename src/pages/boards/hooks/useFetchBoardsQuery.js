import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";
import { normalizeBoards } from "../../../store/boardEntities";

export const useFetchBoardsQuery = () => {
  const fetchBoards = async () => {
    const response = await fetch(`${API_BASE}/boards`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return normalizeBoards(data);
  };

  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });
};
//
