import PropTypes from 'prop-types'
import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

import {StyledTextarea} from '../StyledEditableValue'

const TextEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <StyledTextarea>
      <TextareaAutosize
        rows={2}
        maxRows={20}
        name={props.name}
        onChange={handleChange}
        id={props.id}
        value={props.value}
        disabled={props.readOnly}
      />
    </StyledTextarea>
  )
}

TextEdit.defaultProps = {
  value: ''
}

TextEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextEdit
