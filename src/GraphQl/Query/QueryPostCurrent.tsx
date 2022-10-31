import { gql } from '@apollo/client'

export const QUERY_POST_CURRENT = (id) => {
  console.log('idFromQuery', id)

  return gql`
query GetCurrentPost {
    post (id: "${id}"){
    id
    title
    body
    user {
      name
      id
    }
    comments {
      data {
        id
        name
        email
        body
      }
    }
  }
}
`
}
