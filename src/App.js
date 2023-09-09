import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { onError } from "@apollo/client/link/error";
import { WeatherComponent } from './weather/WeatherComponent';
import "./styles.css";

loadErrorMessages();
loadDevMessages();
removeTypenameFromVariables();
// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([
    new HttpLink({
      uri: 'http://localhost:3000/graphql',
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: 'no-cache',
    mutate: 'no-cache',
    watchQuery: 'no-cache',
  }
});

export default function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <WeatherComponent />
      </ApolloProvider>
    </div>
  );
}
