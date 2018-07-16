import PropTypes from 'prop-types'
import React from 'react'

import {StyledInput} from '../StyledEditableValue'

const convertStringToNumber = stringValue => (
  !stringValue || isNaN(stringValue) ? null : Number(stringValue)
)

const NumberEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(e.target.value))
    }
  }

  return (
    <StyledInput
      disabled={props.readOnly}
      id={props.id}
      name={props.name}
      onChange={handleChange}
      type="number"
      value={props.value}
    />
  )
}

NumberEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default NumberEdit
