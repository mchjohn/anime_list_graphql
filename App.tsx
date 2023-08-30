import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { Home } from './src/screens/Home';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home />

      <StatusBar hidden />
    </ApolloProvider>
  );
}
