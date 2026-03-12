import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    headers: {
      Authorization: API_KEY,
    },
  }),
  cache: new InMemoryCache(),
})
