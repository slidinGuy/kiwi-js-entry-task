const INITIAL_STATE = {
  loading: false,
  allLoaded: false
}

const meta = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEARCH_FLIGHTS":
    case "LOAD_MORE":
      return { ...state, loading: true, allLoaded: false };
    case "SEARCH_FLIGHTS_SUCCESS":
    case "SEARCH_FLIGHTS_FAILURE":
      return { ...state, loading: false, allLoaded: false };
    case "ALL_LOADED":
      return { ...state, loading: false, allLoaded: true };
    default:
      return state;
  }
}

export default meta;