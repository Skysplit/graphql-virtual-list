import gql from "graphql-tag";


export const getProperties = gql`
query Properties($page: Int, $sortField: String, $sortOrder: String, $query: String) {
  allProperties(page: $page, sortField: $sortField, sortOrder: $sortOrder, filter: { q: $query }, perPage: 100) {
    id
    ownerName
    address
    units
    score
    convRent
    rentPerMo
  }
}
`
