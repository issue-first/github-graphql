import React, { Component } from "react";

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Graphql from "./components/graphql.js";
import Rest from "./components/rest.js";
import { If, Then } from "./components/conditional.js";


const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer 34a999103ad85a83414b0c2f9ad38715ceca2b8a
    `,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRest: false,
      showGraphql: false
    };
  }

  toggleGraphql = () => {
    let bool = this.state.showGraphql;
    this.setState({ showGraphql: !bool });
  };

  toggleRest = () => {
    let bool = this.state.showRest;
    this.setState({ showRest: !bool });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <button onClick={() => this.toggleGraphql()}>GraphQL</button>
            <If condition={this.state.showGraphql}>
              <Then>
                <Graphql />
              </Then>
            </If>

            <button onClick={() => this.toggleRest()}>Rest</button>

            <If condition={this.state.showRest}>
              <Then>
                <Rest />
              </Then>
            </If>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
