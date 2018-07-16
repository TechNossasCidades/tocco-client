import PropTypes from 'prop-types'
import React from 'react'
import TetheredSelectWrap from './TetherSelectWrap'
import _isEmpty from 'lodash/isEmpty'

import {StyledSelect} from '../StyledEditableValue'

const SingleSelect = props => {
  const onChange = value => {
    props.onChange(value)
  }

  const getOptions = () => {
    if (!_isEmpty(props.options.store)) {
      return props.options.store
    }
    if (props.value) {
      return [props.value]
    }
    return []
  }

  let selectComponent
  const focusSelect = () => selectComponent.focus()

  return (
    <StyledSelect tabIndex="-1" id={props.id} onFocus={focusSelect}>
      <TetheredSelectWrap
        autosize={false}
        single
        valueKey="key"
        labelKey="display"
        clearable
        placeholder=""
        noResultsText="-"
        value={props.value}
        onChange={onChange}
        options={getOptions()}
        disabled={props.readOnly}
        ref={select => { selectComponent = select }}
      />
    </StyledSelect>
  )
}

SingleSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    PropTypes.string
  ]),
  options: PropTypes.shape({
    store: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
  }),
  readOnly: PropTypes.bool,
  id: PropTypes.string
}

export default SingleSelect
