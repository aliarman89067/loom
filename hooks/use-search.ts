import { ChangeEvent, useEffect, useState } from "react";
import { useQueryData } from "./use-query-data";
import { seachInfo, searchUsers } from "@/actions/user";

export const useSearch = (key: string, type: "USERS" | "INFO") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: { plan: "PRO" | "FREE" } | null;
        firstName: string | null;
        lastName: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => {
      clearTimeout(delayInputTimeoutId);
    };
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const workspace = await searchUsers(queryKey[0] as string);
        if (workspace.status === 200) {
          setOnUsers(workspace.data);
        }
      }
      if (type === "INFO") {
        const info = await seachInfo(query);
        if (info.status === 200 && info.data) {
          setOnUsers(info.data);
        }
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers };
};
