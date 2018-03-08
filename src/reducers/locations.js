const locations = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_LOCATIONS_SUCCESS":
      return action.payload;
    default:
      return state;
  }
}

export default locations;