let initialState = {
  page: 1,
  startCursor: null,
  endCursor: null,
  nextStart: null,
  prevStart: null
};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "NEXT_PAGE":
      let nextPage = (state.page += 1);
      let newState = { ...state, page: nextPage };
      console.log("next state", newState);
      return newState;

    case "PREV_PAGE":
      // console.log('next state', state);

      let prevPage = state.page === 1 ? 1 : (state.page -= 1);
      newState = { ...state, page: prevPage };
      console.log("minus state", newState);
      return newState;

    case "RESET_CURSOR":
        console.log(payload);
      return state;

    default:
      return state;
  }
};
