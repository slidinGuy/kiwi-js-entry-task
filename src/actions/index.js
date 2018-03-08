export const searchFlights = (from, to, date) => ({
  type: "SEARCH_FLIGHTS",
  from, to, date
});

export const loadMore = () => ({
  type: "LOAD_MORE"
});

export const searchLocations = (q) => ({
  type: "SEARCH_LOCATIONS",
  q
});