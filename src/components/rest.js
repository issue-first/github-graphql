import React, { Component } from "react";
import { connect } from "react-redux"

import { If, Then, Else } from "./conditional.js";
import GitIssue from "../components/git-issue.js";
import superagent from "superagent";

class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoIssues: [],
      repos: [],
      repo: "",
      pageNumber: null,
    };
  }

  getIssueInfo = async(language, label, pageNum)=>{
    console.log('getting all new issues');
    let URL = `https://api.github.com/search/issues?q=+is:open+is:public+language:${language}+label:${label}&per_page=20&page=${pageNum}`
    let allInfoIssues = [];
    try{
      let issues = await superagent.get(URL).set(`Authorization`, `bearer ${process.env.REACT_APP_GIT}`);
      let repos = issues.body.items.map(issue =>{
        return issue.repository_url;
      });
      
      let repoRequests = repos.map( (repo)=>{
        return superagent.get(repo).set(`Authorization`, `bearer ${process.env.REACT_APP_GIT}`);
      })
      
      let allRepos = await Promise.all(repoRequests);
      
      allInfoIssues = issues.body.items;
        for (let i = 0; i < allInfoIssues.length; i++) {
            allInfoIssues[i].repo_name = allRepos[i].body.name;
            allInfoIssues[i].watchers = allRepos[i].body.watchers;
            allInfoIssues[i].repo_description = allRepos[i].body.description;
            allInfoIssues[i].repo_url = allRepos[i].body.git_url;
          }     
          this.setState({ infoIssues: allInfoIssues, pageNumber: this.props.pageNum});
        }
        catch(e){console.error('cannot make requests');}
  }

  render() {
    if(!this.state.pageNumber || (this.props.pageNum !== this.state.pageNumber)){
      this.getIssueInfo(this.props.language, this.props.label, this.props.pageNum);
    }
    console.log('global state via the app page: ', this.props.pageNum)
    return (
          <div>
            <If condition={this.state.infoIssues}>
              <Then>
                <ul>
                  {this.state.infoIssues.map((issue, i) => (
                    <li>
                      <GitIssue key={`rest-issue-${i}`}
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
    );
  }
}

const mapStateToProps = state => ({
  pageNum: state.data.page,
  language: state.data.language,
  label: state.data.label,
});

export default connect(
  mapStateToProps)(Rest);

