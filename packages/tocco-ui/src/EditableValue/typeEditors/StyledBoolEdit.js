import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledIcon} from '../../Icon'

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox'
})`
  &&& {
    display: none;
  }
`

const StyledCheckboxIcon = styled.label`
  &&& {
    margin: 0;
    font-weight: 400;

    ${StyledIcon} {
      border: 2px solid ${theme('colors.base.text')};
      border-radius: ${theme('radii.2')}
      box-sizing: content-box;
      width: calc(${theme('fontSizes.3')} * ${theme('lineHeights.1')});
      text-align: center;
    }
  }
`

export {
  StyledCheckbox,
  StyledCheckboxIcon
}
