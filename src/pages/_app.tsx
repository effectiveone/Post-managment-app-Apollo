/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../GraphQl/Client'

import '@src/styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default App
