import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./redux/actions.js";

class Pagination extends Component {
  getNextPage = () => {
    this.props.nextPage();
  };
  getPrevPage = () => {
    this.props.prevPage();
  };
  render() {
    return (
      <nav
        style={{ width: "200px" }}
        class="pagination"
        role="navigation"
        aria-label="pagination"
      >
        <div
          onClick={() => {
            this.getPrevPage();
          }}
          class="button pagination-previous"
        >
          Previous
        </div>
        <div
          onClick={() => {
            this.getNextPage();
          }}
          class="button pagination-next"
        >
          Next page
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  page: state.data.page
});

const mapDispatchToProps = (dispatch, getState) => ({
  nextPage: () => dispatch(actions.nextPage()),
  prevPage: () => dispatch(actions.prevPage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
