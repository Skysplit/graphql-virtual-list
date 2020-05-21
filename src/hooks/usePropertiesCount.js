import { useQuery } from "@apollo/react-hooks";
import { getPropertiesCount } from "../graphql";

export function usePropertiesCount({ query }) {
  const { loading, data } = useQuery(getPropertiesCount, {
    variables: {
      query: query || null,
    }
  });

  return {
    loading,
    count: data && data._allPropertiesMeta.count,
  }
}
