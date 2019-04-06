import React from "react";

import GQLComponent, { ISSUES } from "../../components/graphql.js";

import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme'

import { ApolloProvider } from "react-apollo";
import { mount } from "enzyme";
import { spy } from "sinon";

// import "../mocks/";
import clientMock from "../mocks/client-mock.js";

configure({ adapter: new Adapter() });

describe("GQL Component", () => {
  it("expects true to be true", () => {
    expect(true).toBe(true);
  });
  it("calls the query method on Apollo Client", () => {
    spy(clientMock, "query");
    const wrapper = mount(
      <ApolloProvider client={clientMock}>
        <GQLComponent query="is:open" number={2}/>
      </ApolloProvider>
    );
    let button = wrapper.find('#gql-button');
    console.log('button', button);
    button.simulate('click');
    expect(clientMock.query.calledOnce).toEqual(true);

    expect(clientMock.query.getCall(0).args[0].query).toEqual(
        ISSUES,
      );
  });
  it("renders correctly after query method on apoolo client executred", () => {});
});
