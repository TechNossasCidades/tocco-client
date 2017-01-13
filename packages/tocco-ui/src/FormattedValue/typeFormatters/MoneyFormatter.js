import React from 'react'
import {FormattedNumber} from 'react-intl'

const MoneyFormatter = props => {
  if (props.value) {
    return (
      <FormattedNumber
        value={props.value}
        style="decimal"
        minimumFractionDigits={2}
      />
    )
  }
}

MoneyFormatter.propTypes = {
  value: React.PropTypes.number
}

export default MoneyFormatter