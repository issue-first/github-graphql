import React, { Component } from "react";

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
      issueEndPoint: `https://api.github.com/search/issues?q=label:good-first-issue+is:public+is:open+language:javascript`,
      baseEndPoint: `https://api.github.com/search/repositories?q=topic:graphql`,
      renderInfoIssues: false
    };
    this.getIssueInfo();
  }

  getIssueInfo = async()=>{
    let allInfoIssues = [];
    try{
      let issues = await superagent.get(this.state.issueEndPoint).set(`Authorization`, `bearer ${process.env.REACT_APP_GIT}`);
      let repos = issues.body.items.map(issue =>{
        return issue.repository_url;
      });
      
      let repoRequests = repos.map( (repo)=>{
        return superagent.get(repo).set(`Authorization`, `bearer ${process.env.REACT_APP_GIT}`);
      })
      
      let allRepos = await Promise.all(repoRequests);
      console.log('assl repos', allRepos)
      
      allInfoIssues = issues.body.items;
        for (let i = 0; i < allInfoIssues.length; i++) {
            allInfoIssues[i].repo_name = allRepos[i].body.name;
            allInfoIssues[i].watchers = allRepos[i].body.watchers;
            allInfoIssues[i].repo_description = allRepos[i].body.description;
            allInfoIssues[i].repo_url = allRepos[i].body.git_url;
          }     
          this.setState({ infoIssues: allInfoIssues});
        }
        catch(e){console.error('cannot make requests');}
  }

  render() {
    return (
      <section className="container">
        <div>
          <div>
            <If condition={this.state.infoIssues}>
              <Then>
                <ul>
                  {this.state.infoIssues.map((issue, i) => (
                    <li>
                      <GitIssue
                        issue_url={issue.url}
                        issueUpdate={issue.updated_at.split('T')[0]}
                        issueBody={issue.body}
                        issueTitle={issue.title}
                        repo_url={issue.repository_url}
                        repo_name={issue.repo_name}
                        repo_description={issue.repo_description}
                        watchers={issue.watchers}
                      />
                    </li>
                  ))}
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
