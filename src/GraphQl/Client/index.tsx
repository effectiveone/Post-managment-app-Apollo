import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      keyFields: false,
    },
    Attribute: {
      keyFields: false,
    },
  },
})

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache,
})

export { client, cache }
