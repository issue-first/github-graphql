import React from "react";
import github from "../images/github.svg"

export default function header() {
  return (
    <section className="hero has-text-centered is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1">Issue First</h1>
          <h2 className="subtitle is-3">
            Search Github Issues & Contribute to Open Source!
          </h2>
        </div>
        <a target="_blank" href="https://github.com/hingham/github-graphql">

        <img style={{height: "50px", width: "50px"}} src={github}/>

        </a>
      </div>
    </section>
  );
}
