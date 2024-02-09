import { ApolloClient, InMemoryCache } from "@apollo/client";

export const contentfulGraphQLClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
  cache: new InMemoryCache(),
});
