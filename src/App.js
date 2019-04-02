import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

import Graphql from "./components/graphql.js";
import Rest from "./components/rest.js";
import "dotenv";
import { If, Then } from "./components/conditional.js";
import "./index.sass";

console.log(process.env.REACT_APP_GIT);
const GITHUB_BASE_URL = "https://api.github.com/graphql";

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GIT}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
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
  cache
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
      <>
        <section class="hero has-text-centered is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-1">Issue First</h1>
              <h2 class="subtitle is-3">Find JavaScript GitHub Issues Tagged 'Good-First-Issue'</h2>
              {/* <h2 class="subtitle is-3">Langauge: 'JavaScript'</h2> */}

            </div>
          </div>
        </section>
        <ApolloProvider client={client}>
          <div className="columns" style={{ padding: "2em" }}>
            <div className="column is-half">
              <Graphql number={20} lang="python" />
            </div>

            <div className="column is-half">
              <div
                class="button is-info is-large"
                onClick={() => this.toggleRest()}
              >
                Query With GitHub ReST API
              </div>
              <If condition={this.state.showRest}>
                <Then>
                  <Rest number={20}/>
                </Then>
              </If>
            </div>
          </div>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
