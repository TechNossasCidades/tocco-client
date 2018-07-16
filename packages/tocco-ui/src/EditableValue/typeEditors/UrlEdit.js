import PropTypes from 'prop-types'
import React from 'react'

import ButtonLink from '../../ButtonLink'
import {
  StyledInput,
  StyledInputActions
} from '../StyledEditableValue'

const StringEdit = props => {
  const value = props.value || ''

  const normalizeUrl = url => {
    url = url.toLowerCase()
    if (url.indexOf('.') > 0 && !/^[a-z0-9]+:\/\//.test(url)) {
      url = `https://${url}`
    }

    return url
  }

  const handleChange = e => {
    const url = normalizeUrl(e.target.value)
    if (props.onChange) {
      props.onChange(url)
    }
  }

  return (
    <React.Fragment>
      <StyledInput
        type="url"
        name={props.name}
        value={value}
        onChange={handleChange}
        id={props.id}
        disabled={props.readOnly}
      />
      {value
        && !props.readOnly
        && <StyledInputActions>
          <ButtonLink
            href={value}
            icon="fa-external-link"
            iconPosition="solely"
            rel="noopener noreferrer"
            tabIndex="-1"
            target="_blank"
          />
        </StyledInputActions>
      }
    </React.Fragment>
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default StringEdit
