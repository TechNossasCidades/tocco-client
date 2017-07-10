import {delay} from 'redux-saga'
import {call, put, fork, select, takeLatest, take, all} from 'redux-saga/effects'
import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {fetchEntities, selectEntitiesTransformer} from '../../util/api/entities'
import {INITIALIZED} from '../entityList/actions'

export const searchFormSelector = state => state.searchForm
export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SET_SEARCH_INPUT, setSearchTerm),
    fork(takeLatest, actions.RESET, setSearchTerm),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity)
  ])
}

export function* loadSearchForm(formDefinition, searchFormName) {
  if (formDefinition.length === 0) {
    formDefinition = yield call(fetchForm, searchFormName, searchFormTransformer)
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* setInitialSearchInputs(entityModel, preselectedSearchFields) {
  for (const preselectedSearchField of preselectedSearchFields) {
    const fieldName = preselectedSearchField.id
    const value = preselectedSearchField.value

    let transformedValue = value

    if (entityModel[fieldName] && entityModel[fieldName].type === 'relation') {
      const targetEntity = entityModel[fieldName].targetEntity
      const entities = yield call(loadRelationEntity, actions.loadRelationEntity(targetEntity))

      if (Array.isArray(value)) {
        transformedValue = value.map(v => entities.find(e => e.key === v))
      } else {
        transformedValue = entities.find(e => e.key === value)
      }
    }

    yield put(actions.setSearchInput(fieldName, transformedValue))
  }
}

export function* getEntityModel() {
  let entityList = yield select(entityListSelector)
  if (!entityList.initialized) {
    yield take(INITIALIZED)
  }

  entityList = yield select(entityListSelector)

  return entityList.entityModel
}

export function* initialize() {
  const {formDefinition, preselectedSearchFields, searchFormName} = yield select(searchFormSelector)
  const entityModel = yield call(getEntityModel)

  yield all([
    call(loadSearchForm, formDefinition, searchFormName),
    call(setInitialSearchInputs, entityModel, preselectedSearchFields)
  ])
}

export function* setSearchTerm() {
  yield call(delay, 400)
  const {searchValues} = yield select(searchFormSelector)
  yield put(actions.searchTermChange(searchValues))
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(searchFormSelector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const entities = yield call(fetchEntities, entityName, {}, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
    return entities
  }
  return relationEntities[entityName].data
}
