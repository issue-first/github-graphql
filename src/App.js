import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./components/redux/actions.js";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from "apollo-cache-inmemory";

import Graphql from "./components/graphql.js";
import Rest from "./components/rest.js";
import Header from "./components/header.js";
import Pagination from "./components/pagination.js";
import StaticGraphQL from "./components/static-graphql.js";
import Footer from "./components/footer.js"
// import introspectionQueryResultData from './gql-json.json';

import Form from "./components/form.js";
import "dotenv";
import { If, Then, Else } from "./components/conditional.js";
import "./index.sass";
import "./style/base.css";

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
      //need this to be false when find issues is clicked
      showRest: false,
      language: "",
      label: "",
      queryString: "is:open is:public"
    };
  }

  toggleRest = () => {
    // this.setState({ showRest: true });
    this.props.toggleRest();
  };

  render() {
    return (
      <>
        <ApolloProvider client={client}>
        <section className="main">
          <Header />
          <Form />

          <If condition={this.props.pageCount && this.props.newSearch}>
            <Then>
              <Pagination />
            </Then>
          </If>
          <If condition={this.props.newSearch}>
            <Then>
              <div className="columns" style={{ padding: "2em" }}>
                <div className="column is-half">
                  <If condition={this.props.page === 1}>
                    <Then>
                      <Graphql
                        number={20}
                        query={`${this.state.queryString} language:${
                          this.props.language
                        } label:${this.props.label} is:issue`}
                      />
                    </Then>
                    <Else>
                      <StaticGraphQL
                        number={20}
                        query={`${this.state.queryString} language:${
                          this.props.language
                        } label:${this.props.label} is:issue`}
                      />
                    </Else>
                  </If>
                </div>

                <div className="column is-half">
                  <div
                    class="button is-info is-large"
                    onClick={() => this.toggleRest()}
                  >
                    Query With Github REST API
                  </div>
                  <If condition={this.props.showRest}>
                    <Then>
                      <Rest />
                    </Then>
                  </If>
                </div>
              </div>
            </Then>
          </If>
        </section>
        </ApolloProvider>
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  page: state.data.page,
  language: state.data.language,
  label: state.data.label,
  currentStart: state.data.currentStart,
  pageCount: state.data.pageCount,
  newSearch: state.data.newSearch,
  showRest: state.data.showRest,
  prevStart: state.data.prevStart
});

const mapDispatchToProps = (dispatch, getState) => ({
  toggleRest: () => dispatch(actions.toggleRest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
