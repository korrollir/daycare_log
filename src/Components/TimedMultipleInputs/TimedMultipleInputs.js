import React, { Component } from 'react'

import TimeSlider from '../TimeSlider/TimeSlider'
import SelectOptions from '../SelectOptions/SelectOptions'

import styles from './TimedMultipleInputs.css'

class InfantMultipleInputs extends Component {
  constructor (props) {
    super(props)

    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  handleTimeChange (time, index, id, key) {
    /* Update onChangeTime prop from parent form */
    this.props.onChangeTime(time, index, id, key)
  }

  handleChange (e, index, id, key) {
    this.props.onChange(e.target.value, index, id, key)
  }


  render () {
    const inputItems = this.props.items.map((item, index) => {
      const { id, selectLabel, optionsArr } = this.props
      return [
        <div key='1'>
          <TimeSlider
            id={id}
            onTimeChange={this.handleTimeChange}
          />
        </div>,
        <div key='2'>
          <label htmlFor={index}>{selectLabel}</label>
          <SelectOptions
            options={optionsArr}
            name={item}
            onChange={(e) => this.handleChange(e, index, id, selectLabel)}
          />
        </div>
      ]
    })

    return (
      <section className={styles.mainContainer}>
        <h3>{this.props.title}</h3>
        {
          (this.props.rows === 8)
            ? <div className={styles.gridContainer2x8}>{inputItems}</div>
            : (this.props.rows === 6)
              ? <div className={styles.gridContainer2x6}>{inputItems}</div>
              : <div className={styles.gridContainer2x4}>{inputItems}</div>
        }
      </section>
    )
  }
}

export default InfantMultipleInputs
