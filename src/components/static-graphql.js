import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../components/redux/actions.js";

import { Query, graphql, withApollo, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import GitIssue from "../components/git-issue.js";
import { If, Then, Else } from "./conditional.js";
import "../index.sass";

const STATIC_ISSUES = gql`
  query($resultsNum: Int, $queryString: String!, $start: String!) {
    search(
      query: $queryString
      type: ISSUE
      first: $resultsNum
      after: $start
    ) {
      issueCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Issue {
            body
            updatedAt
            title
            url
            repository {
              description
              url
              name
              watchers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

class StaticIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      renderResults: false
    };
  }

  render() {
    console.log('results', this.props);
    return (
        <Query query={STATIC_ISSUES} variables={{
                    resultsNum: this.props.number,
                    queryString: this.props.query,
                    start: this.props.start
                  }}>
          {({ loading, error, data }) => {
              console.log('data', data)
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            if (data.search) {
                this.props.getCursor(data.search.pageInfo);
                return (
                <>
                <div className="button is-primary is-large is-info">Query With Github GraphQL</div>
                  <ul>
                    {data.search.edges.map((edge, i) => {
                      return (
                        <li key={`st-ql` + i}>
                          <GitIssue
                            issueBody={edge.node.body}
                            issueTitle={edge.node.title}
                            issueUpdate={edge.node.updatedAt.split("T")[0]}
                            issue_url={edge.node.url}
                            repo_name={edge.node.repository.name}
                            repo_url={edge.node.repository.url}
                            repo_description={edge.node.repository.description}
                            watchers={edge.node.repository.watchers.totalCount}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  </>
            )};
          }}
        </Query>
    );
  }
}

const mapStateToProps = state => ({
  start: state.data.currentStart
});

const mapDispatchToProps = (dispatch, getState) => ({
  getCursor: cursors => dispatch(actions.resetCursor(cursors))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticIssues);
