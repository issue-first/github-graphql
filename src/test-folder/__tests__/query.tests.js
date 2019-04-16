import React from "react";

import GQLComponent, { IssueClass, ISSUES } from "../../components/graphql.js";

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

import { ApolloProvider } from "react-apollo";
import { mount, shallow } from "enzyme";
import { spy } from "sinon";

import configureStore from "redux-mock-store";
const initialState = {
  currentStart: "Y3Vyc29yOjE=",
  currentEnd: null,
  prevStart: [],
  language: null,
  status: "open",
  access: "public",
  label: null,
  perPage: 20,
  page: 1,
  newSearch: false,
  showRest: false,
  pageCount: 0
};

const mockStore = configureStore();
let wrapper;
let store;

// import "../mocks/";
import clientMock from "../mocks/client-mock.js";

configure({ adapter: new Adapter() });

describe("GQL Component", () => {
  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState)
   });

  it("expects true to be true", () => {
    expect(true).toBe(true);
  });
  it("calls the query method on Apollo Client", () => {
    spy(clientMock, "query");
    const wrapper = mount(
      // <Provider store={store}>
        <ApolloProvider client={clientMock}>
          <IssueClass query="is:open" number={2} />
        </ApolloProvider>
      // </Provider>
    );
    let button = wrapper.find("#gql-button");
    console.log("button", button);
    button.simulate("click");
    expect(clientMock.query.calledOnce).toEqual(true);

    expect(clientMock.query.getCall(0).args[0].query).toEqual(ISSUES);
  });
  it("renders correctly after query method on apoolo client executred", () => {});
});
