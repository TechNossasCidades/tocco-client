export const SET_FORM_DEFINITION = 'entityDetail/SET_FORM_DEFINITION'
export const LOAD_DETAIL_VIEW = 'entityDetail/LOAD_DETAIL_VIEW'
export const SET_ENTITY = 'entityDetail/SET_ENTITY'
export const SUBMIT_FORM = 'entityDetail/SUBMIT_FORM'
export const SET_LAST_SAVE = 'entityDetail/SET_LAST_SAVE'
export const SET_ENTITY_MODEL = 'entityDetail/SET_ENTITY_MODEL'
export const UNLOAD_DETAIL_VIEW = 'entityDetail/UNLOAD_DETAIL_VIEW'

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