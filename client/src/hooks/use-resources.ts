import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useResources() {
  return useQuery({
    queryKey: [api.resources.list.path],
    queryFn: async () => {
      const res = await fetch(api.resources.list.path);
      if (!res.ok) throw new Error("Failed to fetch resources");
      return api.resources.list.responses[200].parse(await res.json());
    },
  });
}
