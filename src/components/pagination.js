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
          style={{ margin:"auto", width: "200px"}}
          class="pagination"
          role="navigation"
          aria-label="pagination"
        >
          <div
            onClick={() => {
              this.getPrevPage();
            }}
            class="button pagination-previous has-background-primary"
          >
            Previous
          </div>

          <div
            onClick={() => {
              this.getNextPage();
            }}
            class="button pagination-next has-background-primary"
          >
            Next
          </div>
        </nav>
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
