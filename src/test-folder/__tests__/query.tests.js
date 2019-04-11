import React from "react";

import GQLComponent, { ISSUES } from "../../components/graphql.js";
import GitIssue from "../../components/git-issue.js"

import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme'

import { ApolloProvider } from "react-apollo";
import { mount } from "enzyme";
import { spy } from "sinon";
import renderer from "react-test-renderer";

// import "../mocks/";
import clientMock from "../mocks/client-mock.js";

configure({ adapter: new Adapter() });

describe("GraphQL Component", () => {
  it("calls the query method on when button clicked", () => {
    spy(clientMock, "query");
    const component = mount(
      <ApolloProvider client={clientMock}>
        <GQLComponent query="is:open" number={2}/>
      </ApolloProvider>
    );

    component.find('#gql-button').simulate('click');

    expect(clientMock.query.calledOnce).toEqual(true);
    expect(clientMock.query.getCall(0).args[0].query).toEqual(ISSUES);
    
    clientMock.query.restore();
  });


  it("renders correctly after query method", () => {
    const component = mount(
      <ApolloProvider client = {clientMock}>
        <GQLComponent query="is:open" number={2}/>
      </ApolloProvider>
    );
    let button = component.find('#gql-button');
    button.simulate('click');
    
  });
});
