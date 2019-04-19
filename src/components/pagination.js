import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./redux/actions.js";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueCount: null
    };
  }
  getNextPage = () => {
    this.props.nextPage();
  };
  getPrevPage = () => {
    this.props.prevPage();
  };

  render() {
    return (
      <div class="container" style={{marginTop: "2em"}}>
        <nav
          style={{ margin:"auto", width: "300px"}}
          class="pagination"
          role="navigation"
          aria-label="pagination"
          >
          <div
            onClick={() => {
              this.getPrevPage();
            }}
            class="button pagination-previous has-background-primary is-size-4"
            >
            Previous Page 
          </div>

          <div
            onClick={() => {
              this.getNextPage();
            }}
            class="button pagination-next has-background-primary is-size-4"
            >
             Next Page
          </div>
        </nav>
        <div className="container is-primary has-text-centered is-size-4">
          <div classname="has-background-primary">Results: {((this.props.page - 1) * 20)+1} - {this.props.page*20} of {this.props.issueCount} </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.data.page,
  issueCount: state.data.issueCount
});

const mapDispatchToProps = (dispatch, getState) => ({
  nextPage: () => dispatch(actions.nextPage()),
  prevPage: () => dispatch(actions.prevPage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
