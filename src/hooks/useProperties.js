import { useQuery } from "@apollo/react-hooks";
import { getProperties } from "../graphql";

export function useProperties({ query, page, sortField, sortOrder }) {
  const { loading, data, fetchMore } = useQuery(getProperties, {
    variables: {
      sortField,
      sortOrder,
      page,
      query: query || null,
    }
  });

  return {
    loading,
    fetchMore,
    properties: data && data.allProperties,
  };
}
