import React from "react";
import PropTypes from "prop-types";
import "../style/base.css"

const GitIssue = props => {

  return (
    <>
      <div className="card" style={{ marginTop: "20px" }}>
        <div className="card-header is-3" style={{ padding: "15px" }}>
          <a
            href={props.issue_url}
            style={{
              padding: "6px",
              fontSize: "1.5em",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px"
            }}
          >
            {props.issueTitle}
          </a>
        </div>

        <div className="card-content" style={{ padding: "10px" }}>
          <div>
            {" "}
            <strong>Last Updated:</strong> {props.issueUpdate}
          </div>
          <div>
            {" "}
            <strong>Description: </strong>
            {props.issueBody}
          </div>
          <div>
            <hr />
            <a className="content" href={props.repo_url}>
              {" "}
              <strong>Repo:</strong>
              {props.repo_name}
            </a>
            <div>
              <strong>Watchers:</strong> {props.watchers}
            </div>
            <div>
              <strong>Description:</strong> {props.repo_description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

GitIssue.propTypes = {
  issue_url: PropTypes.string,
  issueUpdate: PropTypes.string,
  issueBody: PropTypes.string,
  issueTitle: PropTypes.string,
  repo_url: PropTypes.string,
  repo_name: PropTypes.string,
  watchers: PropTypes.number,
  repo_description: PropTypes.string
};
export default GitIssue;
