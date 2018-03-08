import React, { Component } from 'react';
import { Segment, Header, Message } from 'semantic-ui-react';
import VisibilitySensor from 'react-visibility-sensor';

class Flights extends Component {
  handleVisibilityChange = (isVisible) => {
    if (isVisible && !this.props.allLoaded) {
      this.props.onLoadMore();
    }
  }

  render() {
    const haveFlights = this.props.flights.length > 0;
    return (
      <div className="Flights" >
        {haveFlights && this.props.flights.map((flight) =>
          <Segment key={flight.id} basic>
            <Header>{flight.route}
              <Header.Subheader>
                {'  💶 ' + flight.price}
                {'  📆 ' + flight.departure}
                {'  ⏲ ' + flight.duration}
              </Header.Subheader>
            </Header>
          </Segment>
        )}
        {this.props.isLoading
          ? <Segment basic loading />
          : haveFlights
            ? <VisibilitySensor
              onChange={this.handleVisibilityChange}
              scrollCheck delayedCall
            />
            : <Message>No flights match your query</Message>
        }
      </div>
    );
  }
}

export default Flights;
