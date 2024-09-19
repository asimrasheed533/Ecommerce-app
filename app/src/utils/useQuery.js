import axios from "./axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher);

export { data, error, isLoading, isValidating, mutate };
