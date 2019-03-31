import React, { Component } from "react";
import axios from "axios";
import { Query, graphql, withApollo, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import GitIssue from "../components/git-issue.js";
import { If, Then, Else } from "./conditional.js";
import "../index.sass";

const ISSUES = gql`
  query($resultsNum: Int) {
    search(
      query: "label:good-first-issue is:open is:public language:javascript"
      type: ISSUE
      first: $resultsNum
    ) {
      issueCount
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

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      renderResults: false
    };
  }

  onIssueFetched = (issues, error, errors) => {
    if (error || errors) {
      console.log("ERROR:", error ? error : errors);
    }

    this.setState(() => ({ issues, renderResults: !this.state.renderResutls }));
    console.log("state", this.state);
  };

  toggleGraphQL = () => {
    let bool = this.state.graphqlToggle;
    this.setState({ graphqlToggle: !bool });
  };

  render() {
    return (
      <>
        <ApolloConsumer>
          {client => (
              <div
                className="button is-primary is-large is-info"
                onClick={async () => {
                  const { data, error, errors } = await client.query({
                    query: ISSUES,
                    variables: { resultsNum: this.props.number }
                  });
                  this.onIssueFetched(data.search.edges, error, errors);
                  client.clearStore();
                }}
              >
                Graphql
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
                      // issue_url={node}
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

export default Issues;
// export default Issues;
