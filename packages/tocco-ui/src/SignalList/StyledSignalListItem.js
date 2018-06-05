import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledIcon} from '../Icon'
import {stylingCondition} from '../utilStyles'

const StyledSignalListItem = styled.li`
  color: ${props => getColor(props)}

  ${StyledIcon} {
    width: ${theme('space.5')}
    text-align: center;
  }
`

const getColor = props => {
  switch (props.condition) {
    case stylingCondition.DANGER:
      return theme('colors.signal.danger')(props)
    case stylingCondition.SUCCESS:
      return theme('colors.signal.success')(props)
    case stylingCondition.WARNING:
      return theme('colors.signal.warning')(props)
    case stylingCondition.PRIMARY:
      return theme('colors.primary.line.1')(props)
    case stylingCondition.Base:
      return 'inherit'
  }
}

export default StyledSignalListItem