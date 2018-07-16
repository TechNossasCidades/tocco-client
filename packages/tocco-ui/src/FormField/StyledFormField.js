import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const StyledFormField = styled.div`
  margin: 0 0 ${props => theme('space.4')} 0;
`

const StyledHelp = styled.span`
  && {
    ${props => declareFont(props, {
    fontSize: theme('fontSizes.1')(props)
  })}
    color: ${props => props.error ? theme('colors.signal.danger') : theme('colors.base.text')};
    width: 100%;
    display: inline-block;
  }
`

export {
  StyledFormField,
  StyledHelp
}
