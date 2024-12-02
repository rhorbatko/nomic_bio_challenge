import useSWR from "swr";
import { fetchJson } from "./fetching";

type Target = {
  id: number;
  name: string;
};

export function useTargets() {
  const { data, error, isLoading } = useSWR<Target[]>(
    "/api/targets/",
    fetchJson
  );

  return {
    targets: data,
    isLoading,
    isError: error
  };
}
