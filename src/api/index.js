import axios from 'axios';
import moment from 'moment';

export const searchFlights = (from, to, date, offset = 0) => {
  return axios.get('https://api.skypicker.com/flights' +
    '?flyFrom=' + encodeURIComponent(from) +
    '&to=' + encodeURIComponent(to) +
    '&dateFrom=' + encodeURIComponent(date) +
    '&dateTo=' + encodeURIComponent(date) +
    '&limit=5&offset=' + offset +
    '&curr=EUR&partner=picky&partner_market=eu')
    .then(({ data }) => {
      return {
        payload: data.data.map((flight) => {
          const initialRoute = `${flight.cityFrom} (${flight.flyFrom})`
          return {
            id: flight.id,
            price: `${flight.price} EUR`,
            departure: moment.unix(flight.dTimeUTC).format('DD/MM/YYYY'),
            duration: flight.fly_duration,
            route: flight.route.reduce((route, plane) => {
              return `${route} > ${plane.cityTo} (${plane.flyTo})`;
            }, initialRoute)
          };
        }),
        results: data._results
      };
    });
}

const query = `query getLocations($q: String!) {
  allLocations(search: $q) {
    edges {
      node {
        name
      }
    }
  }
}`;

export const searchLocations = (q) => {
  return axios.post('https://graphql.kiwi.com/', {
    query,
    variables: { q }
  }).then(({ data }) => {
    return data.data.allLocations.edges.map(({ node }) => node.name);
  });
}