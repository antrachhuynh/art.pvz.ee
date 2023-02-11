import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { removeLastTrailingSlash } from 'lib/util';
let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
  });

  try {
    return new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache({
        typePolicies: {
          RootQuery: {
            queryType: true,
          },
          RootMutation: {
            mutationType: true,
          },
        },
      }),
    });
  } catch (error) {
    console.error('Error creating Apollo client: ', error);
    // ignore the error and return a default ApolloClient instance
    return new ApolloClient();
  }
}
