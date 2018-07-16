import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../../Icon'
import {
  StyledCheckbox,
  StyledCheckboxIcon
} from './StyledBoolEdit'

const BoolEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <React.Fragment>
      <StyledCheckbox
        checked={props.value}
        name={props.name}
        onChange={handleChange}
        id={props.id}
        disabled={props.readOnly}
      />
      <StyledCheckboxIcon
        htmlFor={props.id}
      >
        <Icon
          icon={props.value ? 'fa-check' : 'fa-times'}
          position="prepend"
        />
      </StyledCheckboxIcon>
    </React.Fragment>
  )
}

BoolEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default BoolEdit
