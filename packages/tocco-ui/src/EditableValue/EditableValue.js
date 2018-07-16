import PropTypes from 'prop-types'
import React from 'react'
import typeEditorFactory, {map as typeEditorFactoryMap} from './typeEditorFactory'
import {FocusWithin} from 'react-focus-within'

import {
  StyledBar,
  StyledLabel,
  StyledWrapper
} from './StyledEditableValue'

/**
 *  To edit values of given type.
 */
const EditableValue = props => {
  const {
    events,
    hasError,
    id,
    isDirty,
    label,
    mandatory,
    onChange,
    options,
    readOnly,
    type,
    value
  } = props

  return (
    <FocusWithin>
      {({focusProps, isFocused}) => (
        <StyledWrapper
          {...focusProps}
          readOnly={readOnly}>
          {typeEditorFactory(
            type,
            value,
            onChange,
            options,
            id,
            events,
            readOnly
          )}
          <StyledLabel
            isDirty={isDirty}
            isFocused={isFocused}
            hasError={hasError}
            hasValue={!!value}
            htmlFor={id}
            mandatory={mandatory}
            type={type}
          >{label}</StyledLabel>
          <StyledBar
            isDirty={isDirty}
            isFocused={isFocused}
            hasError={hasError}
            type={type}
          />
        </StyledWrapper>
      )}
    </FocusWithin>
  )
}

EditableValue.propTypes = {
  /**
   * Type of value. e.g. 'string'
   */
  type: PropTypes.oneOf(
    Object.keys(typeEditorFactoryMap)
  ).isRequired,
  /**
   * Object of functions that gets assigned to the component. E.g. {onBlur: ()=>{}}
   */
  events: PropTypes.objectOf(PropTypes.func),
  /**
   * If true value is marked as falsy.
   */
  hasError: PropTypes.bool,
  /**
   * Id of element.
   */
  id: PropTypes.string,
  /**
   * If true value is marked as changed.
   */
  isDirty: PropTypes.bool,
  /**
   * Describe editable value briefly.
   */
  label: PropTypes.string,
  /**
   * If true an asterisk is appended to the label.
   */
  mandatory: PropTypes.bool,
  /**
   * Function that get emitted on a value change, passing the new value as first argument
   */
  onChange: PropTypes.func,
  /**
   * Depending on the type an object of options can be passed
   */
  options: PropTypes.object,
  /**
   * Determines if value is editable
   */
  readOnly: PropTypes.bool,
  /**
   * Value to display
   */
  value: PropTypes.any
}

export default EditableValue
