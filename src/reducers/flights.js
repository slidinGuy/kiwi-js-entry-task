const flights = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_FLIGHTS":
      return [];
    case "SEARCH_FLIGHTS_SUCCESS":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default flights;