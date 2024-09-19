import axios from "./axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const useQuery = (url) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(url, fetcher);
  return { data, error, isLoading, isValidating, mutate };
};

export default useQuery;
