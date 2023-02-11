import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { removeLastTrailingSlash } from 'lib/util';
let client;
import Router from 'next/router';

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
  try {
    return new ApolloClient({
      link: new HttpLink({
        uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
      }),
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
      onError: ({ networkError }) => {
        if (networkError?.statusCode === 403) {
          Router.replace('https://example.com');
        }
      },
    });
  } catch (error) {
    console.error('Error creating Apollo client: ', error);
    // ignore the error and return a default ApolloClient instance
    return new ApolloClient();
  }
}
