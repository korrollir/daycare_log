import React, { Component } from 'react';

class MultipleInputs extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index) {
    this.props.onChange(e.target.value, index);
  }

  render () {
    const inputItems = this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <label htmlFor={item.id}>{item.time}</label>
          <input type='text' id={item.id} name={item} onChange={(e) => this.handleChange(e, index)} />
        </div>
      );
    });

    return (
      <div>
        {inputItems}
      </div>
    );
  }
}

export default MultipleInputs;