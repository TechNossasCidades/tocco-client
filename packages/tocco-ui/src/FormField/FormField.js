import PropTypes from 'prop-types'
import React from 'react'

import ErrorList from './ErrorList'
import {
  StyledFormField,
  StyledHelp
} from './StyledFormField'

const FormField = props => {
  if (props.hidden) {
    return null
  }

  const helpText = (props.mandatory) ? `* ${props.label} ${props.mandatoryTitle}` : ''

  const {
    children,
    dirty,
    touched,
    error,
    label,
    id,
    mandatory
  } = props

  return (
    <StyledFormField>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          hasError: touched && error,
          id: id,
          isDirty: dirty,
          label: label,
          mandatory: mandatory
        })
      })}
      {helpText && <StyledHelp error={error}>{helpText}</StyledHelp>}
      {touched && error && <ErrorList error={error}/>}
    </StyledFormField>
  )
}

FormField.defaultProps = {
  mandatoryTitle: 'is required'
}

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.required,
  mandatory: PropTypes.bool,
  mandatoryTitle: PropTypes.string,
  children: PropTypes.node,
  hidden: PropTypes.bool,
  touched: PropTypes.bool,
  dirty: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ),
  className: PropTypes.string
}

export default FormField
