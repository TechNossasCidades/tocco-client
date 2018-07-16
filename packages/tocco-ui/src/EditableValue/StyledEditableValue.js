import styled, {css} from 'styled-components'
import {theme} from 'styled-system'

import {StyledButton} from '../Button'
import {StyledButtonLink} from '../ButtonLink'
import {
  declareFont,
  declareOverlay
} from '../utilStyles'

/* TODO
  - check if input reset is complete (css reset & browserspezifishe UI Element Erweiterungn)
  - disable html5 validation
  - harmonize padding, position, font-size and line-height which are tightly related.
    Using theme.space goes certainly wrong.

  - Issues react-select:
    - Clear All funktioniert bei Remote Field nicht
    - Arrow Key Selection funktioniert nicht
    - Reseting zu Material Design führt zu unüberblickbarem Code
    - Kopplung mit DefaultTheme führt zu hohem Anteil an kopierten Code
    - Kann Tether nicht mit Option scrollMenuIntoView abgedeckt werden?

  - Issues Date Picker
    - Clear All Button funktioniert nich
    - Open Picker Button funktionier nicht
    - Date Range funktiniert nicht
*/

const getLabelColor = props => {
  if (props.hasError) {
    return theme('colors.signal.danger')(props)
  } else if (props.isDirty) {
    return theme('colors.signal.warning')(props)
  } else {
    return theme('colors.base.text')(props)
  }
}

const getBarColor = props => {
  if (props.hasError) {
    return theme('colors.signal.danger')(props)
  } else if (props.isDirty) {
    return theme('colors.signal.warning')(props)
  } else {
    return theme('colors.base.fill.2')(props)
  }
}

const StyledWrapper = styled.div`
  && {
    position: relative;
    ${props => props.readOnly
      && declareOverlay(
        theme('overlays.disabled.color')(props),
        theme('overlays.disabled.opacity')(props)
      )}
  }
`

const StyledInputText = css`
  background: ${theme('colors.base.fill.1')};
  border: none;
  border-radius: 0;
  color: ${theme('colors.base.text')};
  padding: ${theme('space.5')} ${theme('space.4')} ${theme('space.3')} ${theme('space.4')};
  width: 100%;

  &:focus {
    outline: none;
  }

  &[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

const StyledInput = styled.input`
  && {
    ${StyledInputText}
  }
`

const StyledFlatpickerInputWrapper = styled.div`
  &&& {
    display: ${props => props.readOnly ? 'none' : 'block'}

    .flatpickr-input {
      ${StyledInputText}
    }
  }
`

const StyledInputActions = styled.div`
  && {
    align-items: center;
    bottom: 0;
    display: flexbox;
    position: absolute;
    right: 3px;
    top: 0;

    ${StyledButton},
    ${StyledButtonLink} {
      border-radius: 50%;
      margin-left: 3px;
    }
  }
`

const StyledTextarea = styled.div`
  && {
    display: flex;  // workaround to close gap between div and textarea

    > textarea {
      ${StyledInputText}
      resize: vertical;
    }
  }
`

// StyledSelect reset approach
// .Select-control {
//   border: none;
//   border-radius: 0;
//   background: ${theme('colors.base.fill.1')};
//   color: ${theme('colors.base.text')};
//   padding: ${theme('space.5')} ${theme('space.4')} ${theme('space.3')} ${theme('space.4')};
//   height: 31.5px; // TODO setting height and absolute positioned children is really unwanted
// }

// .Select-value {
//   ${props => declareFont(props, {})}
//   top: ${theme('space.5')};
//   left: ${theme('space.4')};
//   right: ${theme('space.4')};
//   bottom: ${theme('space.3')};
//   padding: 0;
// }

// .Select-input {
//   height: 18.5px; // TODO setting height and absolute positioned children is really unwanted
//   padding: 0;
// }

// .Select-clear-zone,
// .Select-arrow-zone {
//   display: none !important;
// }

const StyledSelect = styled.div`
  &&& {
    .Select-control {
      border: 1px solid red;
      display: flex;

      > .Select-multi-value-wrapper {
        display: flex;
        flex-grow: 1;

        > .Select-value {
          background-color: lightblue;
        }

        > .Select-input {
          flex-grow: 1;

          > input {
            width: 100%;
            border: none;
            background: beige;
          }
        }
      }

      > .Select-clear-zone:hover,
      > .Select-arrow-zone:hover {
        background-color: teal;
        cursor: pointer;
      }

      .Select-aria-only {
        display: none;  // TODO may make available for screen readers
      }
    }

    .Select-menu-outer {
      border: 1px solid fuchsia;


        .Select-option {
          cursor: pointer;

          &.is-selected {
            background-color: green;
          }

          &.is-focused {
            background-color: red;
          }

          &.is-disabled {
            background-color: gray;
          }

        }
    }
  }
`

const StyledBar = styled.div`
  && {
    border: none;
    background-color: ${props => getBarColor(props)};
    display: ${props => props.type === 'boolean' ? 'none' : 'block'};
    height: ${props => props.isFocused ? '2px' : '1px'};
    margin-bottom: ${props => props.isFocused ? '0' : '1px'};
    width: 100%;
  }
`

const StyledLabelFloating = css`
    font-size: ${props => props.hasValue || props.isFocused
    ? theme('fontSizes.1')(props) : theme('fontSizes.2')(props)};
    left: ${theme('space.4')};
    position: absolute;
    top: ${props => props.hasValue || props.isFocused ? '0' : theme('space.3')(props)};
    transition:
      font-size 300ms ease-in-out,
      top 300ms ease-in-out;
`

const StyledLabelInline = css`

`

const StyledLabel = styled.label`
  && {
    ${props => declareFont(props)}
    color: ${props => getLabelColor(props)};

    ${props => props.type !== 'boolean' ? StyledLabelFloating : StyledLabelInline}

    &:hover {
      cursor: text;
    }

    ${props => props.mandatory && css`
      &:after {
        content: ' *';
      }
    `}
  }
`

export {
  StyledBar,
  StyledFlatpickerInputWrapper,
  StyledInput,
  StyledInputActions,
  StyledLabel,
  StyledSelect,
  StyledTextarea,
  StyledWrapper
}
