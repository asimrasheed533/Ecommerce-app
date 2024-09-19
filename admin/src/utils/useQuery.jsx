import useSWR from "swr";
import axios from "./axios";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function useQuery(url) {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
