import gql from "graphql-tag";

export const getPropertiesCount = gql`
query PropertiesCount($query: String) {
  _allPropertiesMeta(filter: { q: $query }) {
    count
  }
}
`
