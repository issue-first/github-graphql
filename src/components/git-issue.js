import React from 'react'
import PropTypes from 'prop-types'


const GitIssue= (props) => {
  return (
    <>
    <div>Issue</div>
    <div>
      <a href={props.issue_url}>Issue URL</a>
      <div>Laste Updated: {props.issueUpdate}</div>
      <div>{props.issueBody}</div>
      <div>{props.issueTitle}</div>
      {/* <a href={props.repo_name}>Repo URL</a> */}
    </div>

    <div>Repo</div>
    <div>
        <a href={props.repo_url}>Name: {props.repo_title}</a>        
        <div>Watchers: {props.watchers}</div>
        <div>Description: {props.repo_description}</div>

    </div>
    </>
  )
}

GitIssue.propTypes = {
    issue_url: PropTypes.string,
    issueUpdate: PropTypes.string,
    issueBody: PropTypes.string,
    issueTitle: PropTypes.string,
    repo_url: PropTypes.string,
    repo_name: PropTypes.string,
    watchers: PropTypes.number,
    repo_description: PropTypes.string,
}
export default GitIssue