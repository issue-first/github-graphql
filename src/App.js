import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

import Graphql from "./components/graphql.js";
import Rest from "./components/rest.js";
import Header from "./components/header.js";
import Pagination from "./components/pagination.js"
import "dotenv";
import { If, Then, Else } from "./components/conditional.js";
import "./index.sass";

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
      language: "",
      label: "",
      queryString: "is:open is:public"
    };
  }

  languageSelected = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ language: " language:" + e.target.value });
  };

  issueSelected = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ label: " label:" + e.target.value });
  };

  toggleRest = () => {
    let bool = this.state.showRest;
    this.setState({ showRest: !bool });
  };

  render() {
    return (
      <>
        <Header />

        <div class="container has-text-centered">
          <h3 class="title is-primary is-4" style={{ paddingTop: "1em" }}>
            {" "}
            Please Select Lanugage and Issue Type
          </h3>
          <div class="field">
            <div class="select" style={{ paddingRight: "10px" }}>
              <select onChange={e => this.languageSelected(e)}>
                <option>Language</option>
                <option>javascript</option>
                <option>python</option>
              </select>
            </div>

            <div class="select">
              <select onChange={e => this.issueSelected(e)}>
                <option>Label</option>
                <option>good-first-issue</option>
                <option>a-bug</option>
              </select>
            </div>
          </div>
        </div>


        <ApolloProvider client={client}>
        <Pagination/>

          <If condition={this.state.language && this.state.label}>
            <Then>
              <div className="columns" style={{ padding: "2em" }}>
                <div className="column is-half">
                  <Graphql
                    number={20}
                    query={
                      this.state.queryString +
                      this.state.language +
                      this.state.label
                    }
                    lang="python"
                  />
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
                      <Rest
                        number={20}
                        open={this.state.queryString.split(" ")[0]}
                        public={this.state.queryString.split(" ")[1]}
                        language={this.state.language.trim()}
                        label={this.state.label.trim()}
                      />
                    </Then>
                  </If>
                </div>
              </div>
            </Then>
          </If>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
