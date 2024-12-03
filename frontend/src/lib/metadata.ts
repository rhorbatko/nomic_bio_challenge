import useSWR from "swr";
import { fetchJson } from "@/lib/fetching";

type MetaData = {
  keys: string[];
  values: Record<string, string[]>;
};

export function useMetadataOptions() {
  const { data, error, isLoading } = useSWR<MetaData>(
    "/api/metadata-options/",
    fetchJson
  );

  return {
    metadataKeys: data?.keys || [],
    metadataValues: data?.values || {},
    isLoading,
    isError: error
  };
}
