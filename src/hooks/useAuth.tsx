import { getAuthData } from "@/connection/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { isPending, data } = useQuery({
    queryKey: ["authdata"],
    queryFn: getAuthData,
  });

  return [isPending, data];
}
