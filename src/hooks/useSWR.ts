import swr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSWR(url: string | null) {
  return swr(url, fetcher);
}
