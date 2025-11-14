import { useSearch } from "@/hooks/use-search";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type Props = {
  workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
  const { query, isFetching, onSearchQuery, onUsers } = useSearch(
    "get-users",
    "USERS"
  );
  // Continue from here
  const {} = useMutation();

  return <div>Search</div>;
};

export default Search;
