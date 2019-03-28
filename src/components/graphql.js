import React, { Component } from "react";
import axios from "axios";
import { Query } from "react-apollo";
import gql from "graphql-tag";


const ISSUES = gql`
query {
  search(query: "topic:react is:public archived:false", type: REPOSITORY, first: 5) {
    repositoryCount 
    edges {
      node {
        ... on Repository {
          name
          description
          
          watchers {
            totalCount
          }
          languages(first: 3){
           nodes{
            name
          }
          }
          url
         
          issues(labels: "good first issue", first: 5, states:OPEN) {
            totalCount
            edges {
              node {
                title
                url
                state
                lastEditedAt
              }
            }
          }
        }
      }
    }
  }
}

`;

const Issues = () => (
  <Query query={ISSUES}>
    {({ load, error, data }) => {
      if (load) return <p>Loading</p>;
      if (error) return <p> Something went wrong</p>;
      console.log(data);
      return <div>hello</div>;
      // return <div>{data}</div>;
    }}
  </Query>
);

export default Issues;
