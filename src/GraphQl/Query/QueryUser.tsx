import { gql } from '@apollo/client'

export const QuerUsers = gql`
  query getUsers {
    users {
      data {
        id
        name
        username
        email
        website
        phone
        company {
          name
          catchPhrase
        }
      }
    }
  }
`
