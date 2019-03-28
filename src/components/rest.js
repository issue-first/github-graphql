import React, { Component } from "react";
import "../style/base.css";

import { If, Then, Else } from "./conditional.js";
import GitIssue from "../components/git-issue.js";
//this URL gives you all the good first issues for react language
//doesn't give you a lot of data on the repo itself
//we would probably want some details about what it is to know if we are interested in the project
//https://api.github.com/search/issues?q=windows+label:good-first-issue+language:react
import superagent from "superagent";
let GitToken = process.env.GITHUB_API_TOKEN;

class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justIssues: [],
      infoIssues: [],
      repos: [],
      repo: "",
      issueEndPoint:`https://api.github.com/search/issues?q=label:good-first-issue+is:public+is:open+language:javascript`,
      baseEndPoint: `https://api.github.com/search/repositories?q=topic:graphql`
    };
  }

  getIssues = async () => {
    let URL = this.state.issueEndPoint;
    let result = await superagent.get(URL);
    console.log('data', result.body.items);
    // let responseIssues = result.body.items.map(issue => repo.full_name);
    this.setState({ justIssues: result.body.items });
  };


  getIssueInfo = async () => {
    let URL = this.state.issueEndPoint;
    let result = await superagent.get(URL);
    console.log(result.body.items);
    // let issueData = result.body.items.map(issue =>{
    //   issue.newThing = "thing"
    //   console.log('issue', issue)
    //   this.getRepoInfo(issue);
    //   return issue;
    //   // this.getRepoInfo(issue)
    //   // console.log('issue', issue)
    // })
    // let responseIssues = result.body.items.map(issue => repo.full_name);
    this.setState({ infoIssues: result.body.items });
    console.log('state', this.state)
  };

  getRepoInfo = (issue) =>{
    // console.log('url', issue.repository_url);
    let URL = issue.respository_url;
    superagent.get(URL).then(data=>{
      console.log(data);
    })
    // console.log('repoInfo', repoInfo);
    // issue.repo_name = repoInfo.name;
    // issue.watchers = repoInfo.watchers;
    // issue.repo_description= repoInfo.description;
    // issue.repo_url = repoInfo.git_url;
    // return issue;
  }

  // getRepoData = async repo => {
  //   console.log(repo);
  //   this.setState({ repo }, async () => {
  //     console.log("state", this.state);
  //     const data = await superagent.get(
  //       `https://api.github.com/search/repositories?q=repo:${this.state.repo}`
  //     );
  //     console.log("repos data", data);
  //   });
  // };


  render() {
    return (
      <section className="container">
        <div style={{width: "350px"}}>            
        <div > endpoint: {this.state.issueEndPoint}</div>
          <button onClick={() => this.getIssues()}>GitHub Repos</button>
          <If condition={this.state.justIssues}>
            <Then>
              <ul>             
                {this.state.justIssues.map((issue, i) => (
                  <li >
                  <GitIssue 
                  issue_url={issue.url}
                  issueUpdate={issue.updated_at}
                  issueBody={issue.body}
                  issueTitle={issue.title}
                  repo_url={issue.repository_url}/>
              </li>
                ))}
              </ul>
            </Then>
          </If>
        </div>

        <div>            
        <div style={{width: "350px"}}>            
        <div> endpont: {this.state.baseEndPoint}</div>
          <button onClick={() => this.getIssueInfo()}>GitHub Issues Info</button>
          <If condition={this.state.infoIssues}>
            <Then>
              <ul>
                {/* {this.state.infoIssues.map((issue, i) => (
                  <li>
                  <GitIssue 
                  issue_url={issue.url}
                  issueUpdate={issue.updated_at}
                  issueBody={issue.body}
                  issueTitle={issue.title}
                  repo_url={issue.repository_url}/>
                  </li>
                ))} */}
              </ul>
            </Then>
          </If>
        </div>
        </div>
      </section>
    );
  }
}


export default Rest;
