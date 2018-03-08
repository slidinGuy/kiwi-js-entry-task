import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class SearchForm extends Component {
  state = { from: '', to: '', date: moment(), calOpen: false }

  handleChange = (e, { name, value }) => {
    this.props.onSearchLocations(value);
    this.setState({ [name]: value });
  }

  handleDateChange = (date) => {
    this.setState({ date })
    this.toggleCalendar()
  }

  handleSubmit = () => {
    const { from, to, date } = this.state;

    this.props.onSearchFlights(from, to, date.format('DD/MM/YYYY'));
  }

  toggleCalendar = (e) => {
    e && e.preventDefault();
    this.setState({ calOpen: !this.state.calOpen });
  }

  render() {
    const { from, to, date } = this.state;
    return (
      <Form className="SearchForm" onSubmit={this.handleSubmit} >
        <Form.Group widths='equal'>
          <Form.Input
            name='from' value={from}
            placeholder='Fly From'
            onChange={this.handleChange}
            list='locations'
          />
          <Form.Input
            name='to' value={to}
            placeholder='Fly To'
            onChange={this.handleChange}
            list='locations'
          />
          <datalist id='locations'>
            {this.props.locations.map((loc, i) => <option key={i} value={loc} />)}
          </datalist>
          <Form.Input name='date' value={date.format('DD/MM/YYYY')} placeholder='Flight Date' onClick={this.toggleCalendar} />
          {this.state.calOpen && (
            <DatePicker
              withPortal inline allowSameDay
              selected={date}
              onChange={this.handleDateChange}
            />
          )}
          <Form.Button fluid>Find Flights</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default SearchForm;
