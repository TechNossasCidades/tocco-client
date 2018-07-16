import PropTypes from 'prop-types'
import React from 'react'

import SignalList, {SignalListItem} from '../SignalList'

const ErrorList = props => {
  if (!props.error) {
    return null
  }

  const errorValues = []
  Object.keys(props.error).forEach(key => {
    errorValues.push(...props.error[key])
  })

  return (
    <SignalList>
      {errorValues.map((value, idx) => (
        <SignalListItem
          condition="danger"
          key={idx}
          label={value}
        />
      ))}
    </SignalList>
  )
}

ErrorList.propTypes = {
  error: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ).isRequired
}

export default ErrorList
