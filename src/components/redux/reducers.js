let initialState = {
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

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "NEXT_PAGE":
      let newState =
        state.page === state.pageCount
          ? { ...state }
          : {
              ...state,
              page: (state.page += 1),
              prevStart: [...state.prevStart, state.currentStart],
              currentStart: state.currentEnd
            };

      console.log("next state", newState);
      return newState;

    case "PREV_PAGE":
      newState =
        state.page === 1
          ? { ...state }
          : {
              ...state,
              page: (state.page -= 1),
              nextStart: state.currentStart,
              currentStart: state.prevStart.pop()
            };
      console.log("minus state", newState);
      return newState;

    case "NEW_SEARCH":
      newState = { ...state, page: 1, newSearch: true, showRest: false };
      console.log('is the page 1', newState)
      return newState;
    
    case "SHOW_REST":
        newState = {...state, showRest: true}
        return newState;

    case "LANG":
      newState = { ...state, language: payload, newSearch: false };
      return newState;

    case "LABEL":
      newState = { ...state, label: payload, newSearch: false };
      return newState;

    case "RESET_CURSOR":
      let { hasNextPage, hasPreviousPage, startCursor, endCursor } = payload;
      newState = {
        ...state,
        currentEnd: endCursor
      };
      return newState;

    case "ISSUE_TOTAL":
      newState = {
        ...state,
        pageCount: Math.ceil(payload / 20)
      };
      return newState;

    default:
      return state;
  }
};
