import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          merge(existing, incoming) {
            return {
              ...existing,
              ...incoming,
              posts: [...(existing?.posts || []), ...(incoming?.posts || [])],
              albums: [...(existing?.albums || []), ...(incoming?.albums || [])],
            };
          },
        },
      },
    },
    User: {
      fields: {
        posts: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
        albums: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
  cache,
});

// Define a type for the component props
type ApolloClientProviderProps = {
  children: React.ReactNode;
};

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloClientProvider;
