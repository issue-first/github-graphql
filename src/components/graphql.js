import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../components/redux/actions.js'

import { Query, graphql, withApollo, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import GitIssue from "../components/git-issue.js";
import { If, Then, Else } from "./conditional.js";
import "../index.sass";

export const ISSUES = gql`
  query($resultsNum: Int, $queryString: String!) {
    search(
      query: $queryString
      type: ISSUE
      first: $resultsNum
      after: null
    ) {

      issueCount
      pageInfo{
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          __typename ...on Issue {
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

export class IssueClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      renderResults: false
    };
  }

  onIssueFetched = (issues, error, errors) => {
    if (error || errors) {
      console.log("ERROR: ", error ? error : errors);
    }
    
    this.setState(() => ({ issues: issues.edges, renderResults: !this.state.renderResutls }));
    console.log('page data', issues.pageInfo);
    this.props.getCursor(issues.pageInfo);
    this.props.getTotal(issues.issueCount);
  };

  render() {
    console.log('button graphql');
    console.log('query string ', this.props.query)
    return (
      <>
        <ApolloConsumer>
          {client => (
            <div
              className="button is-primary is-large is-info"
              id="gql-button"
              onClick={async () => {
                const { data, error, errors } = await client.query({
                  query: ISSUES,
                  variables: {
                    resultsNum: this.props.number,
                    queryString: this.props.query
                  }
                });
                // this.onIssueFetched(data.search.edges, error, errors);
                console.log('data from query ', data, error, errors)
                this.onIssueFetched(data.search, error, errors);

                client.clearStore();
              }}
            >
              Query With Github GraphQL API
            </div>
          )}
        </ApolloConsumer>

        <If condition={this.state.issues && this.state.renderResults}>
          <Then>
            <ul>
              {this.state.issues.map((edge, i) => {
                return (
                  <li key={`ql` + i}>
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
          </Then>
        </If>
      </>
    );
  }
}

const mapStateToProps = state =>({
  data: state.data
})

const mapDispatchToProps = (dispatch, getState) => ({
  getCursor: cursors => dispatch(actions.resetCursor(cursors)),
  getTotal: total => dispatch(actions.getIssueCount(total))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueClass);



