import * as actions from './actions'
import {reducers} from 'tocco-util'

const setRelationEntity = (state, {payload}) => {
  const relationEntities = {...state.relationEntities}

  if (!relationEntities[payload.entityName]) {
    relationEntities[payload.entityName] = {}
  }

  if (payload.reset) {
    relationEntities[payload.entityName] = {}
    relationEntities[payload.entityName].data = payload.entities
  } else {
    if (!relationEntities[payload.entityName].data) {
      relationEntities[payload.entityName].data = []
    }

    payload.entities.forEach(entity => {
      const idx = relationEntities[payload.entityName].data.findIndex(e => e.value === entity.value)
      if (idx === -1) {
        relationEntities[payload.entityName].data.push(entity)
      }
    })
  }

  return {...state, relationEntities}
}

const setRelationEntityLoaded = (state, {payload}) => {
  const relationEntities = {...state.relationEntities}
  if (!relationEntities[payload.entityName]) {
    relationEntities[payload.entityName] = {}
  }
  relationEntities[payload.entityName].loaded = true
  return {...state, relationEntities}
}

const setRemoteEntity = (state, {payload}) => {
  const {field, entities, moreOptionsAvailable} = payload
  return {
    ...state,
    remoteEntities: {
      ...state.remoteEntities,
      [field]: {
        loading: false,
        entities,
        moreOptionsAvailable
      }
    }
  }
}

const setRemoteEntityLoading = (state, {payload}) => {
  const {field} = payload
  return {
    ...state,
    remoteEntities: {
      ...state.remoteEntities,
      [field]: {
        loading: true,
        entities: []
      }
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_NAME]: reducers.singleTransferReducer('formName'),
  [actions.SET_ENTITY_ID]: reducers.singleTransferReducer('entityId'),
  [actions.SET_MODE]: reducers.singleTransferReducer('mode'),
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducers.singleTransferReducer('entity'),
  [actions.SET_LAST_SAVE]: reducers.singleTransferReducer('lastSave'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_RELATION_ENTITY]: setRelationEntity,
  [actions.SET_RELATION_ENTITY_LOADED]: setRelationEntityLoaded,
  [actions.SET_REMOTE_ENTITY]: setRemoteEntity,
  [actions.SET_REMOTE_ENTITY_LOADING]: setRemoteEntityLoading,
  [actions.SET_TOUCHED]: reducers.singleTransferReducer('touched'),
  [actions.SET_SHOW_SUB_GRIDS_CREATE_BUTTON]: reducers.singleTransferReducer('showSubGridCreateButton'),
  [actions.SET_APP_ID]: reducers.singleTransferReducer('appId')
}

const initialState = {
  appId: '',
  entityName: '',
  formName: '',
  mode: 'update',
  formDefinition: {},
  entity: {},
  entityModel: {},
  relationEntities: {},
  remoteEntities: {},
  touched: false,
  showSubGridCreateButton: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
