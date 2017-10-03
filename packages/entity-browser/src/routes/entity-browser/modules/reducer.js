import * as actions from './actions'
import {reducers} from 'tocco-util'

const setFormBase = (state, {payload}) => {
  const {formBase} = payload
  if (!formBase) return {...state}

  return {
    ...state,
    formBase
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: setFormBase
}

const initialState = {
  entityName: '',
  formBase: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}