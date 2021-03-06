import {theme} from 'styled-system'

const declareElevation = (props, elevation) =>
  `box-shadow: ${theme(`shadows.levels.${elevation}`)(props)} ${theme('shadows.color')(props)};`

export default declareElevation
