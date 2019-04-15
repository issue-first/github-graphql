import React, { Component } from "react";
import * as actions from "./redux/actions";
import { connect } from "react-redux";

class Form extends Component {

  languageSelected = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.props.setLanguage(e.target.value);
  };

  issueSelected = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.props.setLabel(e.target.value);
  };

  render() {
    return (
      <div class="container has-text-centered">
        <h3 class="title is-primary is-4" style={{ paddingTop: "1em" }}>
          {" "}
          Please Select Lanugage and Issue Type
        </h3>
        <div class="field">
          <div class="select" style={{ paddingRight: "10px" }}>
            <select onChange={e => this.languageSelected(e)}>
              <option>Language</option>
              <option>javascript</option>
              <option>python</option>
              <option>java</option>
              <option>.net</option>
            </select>
          </div>

          <div class="select">
            <select onChange={e => this.issueSelected(e)}>
              <option>Label</option>
              <option>good-first-issue</option>
              <option>a-bug</option>
              <option>help-wanted</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    page: state.data.page
  });
  
  const mapDispatchToProps = (dispatch, getState) => ({
    setLanguage: (item) => dispatch(actions.getLanguage(item)),
    setLabel: (item) => dispatch(actions.getLabel(item))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form);

