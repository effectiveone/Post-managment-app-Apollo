import { gql } from '@apollo/client'

export const QUERY_POSTS = (id) => {
  return gql`
query GetPosts {
  user(id: "${id}") {
    id
    name
 posts {
  data {
    id
    title
  }
}
  }
}
`
}
