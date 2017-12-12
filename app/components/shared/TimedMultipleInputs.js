import React, { Component } from 'react';
import moment from 'moment';

import Bottles from '../infants/forms/Bottles';
import Diapers from '../infants/forms/Diapers';
import Naps from '../infants/forms/Naps';

class InfantMultipleInputs extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleTimeFormChange = this.handleTimeFormChange.bind(this);
  }

  handleChange(e, index) {
    this.props.onChange(e.target.value, index);
  }

  handleTimeFormChange(time, index) {
    let selectedTime = moment(time).format('h:mm a');
    this.props.onChangeDateTime(selectedTime, index);
  }

  render() {
    const inputItems = this.props.items.map((item, index) => {
      if(this.props.id === 'bottles') {
        return (
          <Bottles
            key={index}
            item={item}
            index={index}
            time={moment().set({'hour': 7, 'minute': 0})}
            firstLabel='Time: '
            secondLabel='Amount: '
            onChange={(e) => this.onChange(e, index)}
            onChangeDateTime={this.handleTimeFormChange}
          />
        );
      } else if(this.props.id === 'diapers') {
        return (
          <Diapers
            key={index}
            item={item}
            index={index}
            time={moment().set({'hour': 7, 'minute': 0})}
            firstLabel='Time: '
            onChange={(e) => this.onChange(e, index)}
            onChangeDateTime={this.handleTimeFormChange}
          />
        );
      } else {
        return (
          <Naps
            key={index}
            item={item}
            index={index}
            time={moment().set({'hour': 7, 'minute': 0})}
            firstLabel='Time: '
            secondLabel='Length: '
            onChange={(e) => this.onChange(e, index)}
            onChangeDateTime={this.handleTimeFormChange}
          />
        );
      }
    });

    return (
      <div>
        <h3>{this.props.title}</h3>
        {inputItems}
      </div>
    );
  }
}

export default InfantMultipleInputs;
