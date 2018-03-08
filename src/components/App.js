import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import SearchForm from './SearchForm';
import Flights from './Flights';

import { connect } from 'react-redux';
import { searchFlights, loadMore, searchLocations } from '../actions';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Segment attached="top" inverted>
          <SearchForm
            locations={this.props.locations}
            onSearchFlights={this.props.onSearchFlights}
            onSearchLocations={this.props.onSearchLocations}
          />
        </Segment>
        <Segment attached="bottom">
          <Flights
            flights={this.props.flights}
            onLoadMore={this.props.onLoadMore}
            isLoading={this.props.isLoading}
            allLoaded={this.props.allLoaded} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  flights: state.flights,
  isLoading: state.meta.loading,
  allLoaded: state.meta.allLoaded,
  locations: state.locations
});

const mapDispatchToProps = {
  onSearchFlights: searchFlights,
  onLoadMore: loadMore,
  onSearchLocations: searchLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
