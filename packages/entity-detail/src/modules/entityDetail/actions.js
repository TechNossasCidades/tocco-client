export const SET_FORM_DEFINITION = 'entityDetail/SET_FORM_DEFINITION'
export const LOAD_DETAIL_VIEW = 'entityDetail/LOAD_DETAIL_VIEW'
export const SET_ENTITY = 'entityDetail/SET_ENTITY'
export const SUBMIT_FORM = 'entityDetail/SUBMIT_FORM'
export const SET_LAST_SAVE = 'entityDetail/SET_LAST_SAVE'
export const SET_ENTITY_MODEL = 'entityDetail/SET_ENTITY_MODEL'
export const UNLOAD_DETAIL_VIEW = 'entityDetail/UNLOAD_DETAIL_VIEW'
export const LOAD_RELATION_ENTITY = 'entityDetail/LOAD_RELATION_ENTITY'
export const SET_RELATION_ENTITY = 'entityDetail/SET_RELATION_ENTITY'
export const SET_RELATION_ENTITY_LOADED = 'entityDetail/SET_RELATION_ENTITY_LOADED'
export const LOAD_REMOTE_ENTITY = 'entityDetail/LOAD_REMOTE_ENTITY'
export const SET_REMOTE_ENTITY = 'entityDetail/SET_REMOTE_ENTITY'
export const SET_REMOTE_ENTITY_LOADING = 'entityDetail/SET_REMOTE_ENTITY_LOADING'
export const FIRE_TOUCHED = 'entityDetail/FIRE_TOUCHED'
export const SET_TOUCHED = 'entityDetail/SET_TOUCHED'
export const SET_ENTITY_NAME = 'entityDetail/SET_ENTITY_NAME'
export const SET_ENTITY_ID = 'entityDetail/SET_ENTITY_ID'
export const SET_MODE = 'entityDetail/SET_MODE'
export const SET_FORM_NAME = 'entityDetail/SET_FORM_NAME'
export const SET_SHOW_SUB_GRIDS_CREATE_BUTTON = 'entityDetail/SET_SHOW_SUB_GRIDS_CREATE_BUTTON'
export const UPLOAD_DOCUMENT = 'entityDetail/UPLOAD_DOCUMENT'
export const SET_APP_ID = 'entityDetail/SET_APP_ID'

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadDetailView = (modelPaths, entityId) => ({
  type: LOAD_DETAIL_VIEW,
  payload: {
    modelPaths,
    entityId
  }
})

export const setEntity = entity => ({
  type: SET_ENTITY,
  payload: {
    entity
  }
})

export const submitForm = () => ({
  type: SUBMIT_FORM
})

export const setLastSave = (lastSave = Date.now()) => ({
  type: SET_LAST_SAVE,
  payload: {
    lastSave
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

export const unloadDetailView = () => ({
  type: UNLOAD_DETAIL_VIEW
})

export const loadRelationEntity = entityName => ({
  type: LOAD_RELATION_ENTITY,
  payload: {
    entityName
  }
})

export const setRelationEntityLoaded = entityName => ({
  type: SET_RELATION_ENTITY_LOADED,
  payload: {
    entityName
  }
})

export const setRelationEntity = (entityName, entities, reset = false) => ({
  type: SET_RELATION_ENTITY,
  payload: {
    entityName,
    entities,
    reset
  }
})

export const loadRemoteEntity = (field, entityName, searchTerm) => ({
  type: LOAD_REMOTE_ENTITY,
  payload: {
    field,
    entityName,
    searchTerm
  }
})

export const setRemoteEntity = (field, entities, moreOptionsAvailable) => ({
  type: SET_REMOTE_ENTITY,
  payload: {
    field,
    entities,
    moreOptionsAvailable
  }
})

export const setRemoteEntityLoading = field => ({
  type: SET_REMOTE_ENTITY_LOADING,
  payload: {
    field
  }
})

export const fireTouched = touched => ({
  type: FIRE_TOUCHED,
  payload: {
    touched
  }
})

export const setTouched = touched => ({
  type: SET_TOUCHED,
  payload: {
    touched
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setEntityId = entityId => ({
  type: SET_ENTITY_ID,
  payload: {
    entityId
  }
})

export const setMode = mode => ({
  type: SET_MODE,
  payload: {
    mode
  }
})
export const setFormName = formName => ({
  type: SET_FORM_NAME,
  payload: {
    formName
  }
})
export const setShowSubGridsCreateButton = showSubGridCreateButton => ({
  type: SET_SHOW_SUB_GRIDS_CREATE_BUTTON,
  payload: {
    showSubGridCreateButton
  }
})

export const uploadDocument = (file, field) => ({
  type: UPLOAD_DOCUMENT,
  payload: {
    file,
    field
  }
})
export const setAppId = appId => ({
  type: SET_APP_ID,
  payload: {
    appId
  }
})
